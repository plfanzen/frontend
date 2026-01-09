<template>
  <div>
    <div @click="openDialog">
      <div
        ref="card"
        class="relative px-4 py-8 mb-6 bg-white text-black cursor-pointer select-none"
      >
        <canvas
          ref="canvas"
          class="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        ></canvas>
        <div
          class="relative z-10 flex items-center justify-center flex-col text-center"
          :style="{ color: backgroundColor }"
        >
          <h2 class="text-xl font-bold">{{ title }}</h2>
          <p class="mt-2 text-sm">{{ points }} pts | {{ solves }} solves</p>
          <div
            v-if="difficulty"
            class="mt-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
            :style="{
              backgroundColor: difficultyColor || '#666',
              color: 'contrast-color(' + (difficultyColor || '#666') + ')',
            }"
          >
            {{ difficulty }}
          </div>
        </div>
      </div>
    </div>
    <wired-dialog ref="dialog">
      <h2 class="m-0 text-2xl font-semibold">
        {{ title }}
      </h2>
      <div class="mt-[10px] mb-5">
        <MDC :value="description" tag="div" />
        <!-- Download buttons for attachments that call downloadAttachment -->
        <div v-if="attachments && attachments.length > 0" class="mt-4">
          <h3 class="font-semibold mb-2">Attachments:</h3>
          <div class="flex flex-col gap-2">
            <wired-button
              v-for="(attachment, index) in attachments"
              :key="index"
              @click="downloadAttachment(attachment)"
              class="w-full"
            >
              {{ attachment }}
            </wired-button>
          </div>
        </div>
        <div v-if="canExport" class="mt-4">
          <wired-button @click="downloadSrc" class="w-full">
            Download Source Code
          </wired-button>
        </div>
        <wired-button
          @click="launchInstance"
          class="mt-4 w-full"
          fill="#2196F3"
          v-if="!instanceInfo && canStart"
        >
          Launch
        </wired-button>
        <wired-button
          @click="stopInstance"
          class="mt-4 w-full"
          fill="#F44336"
          v-else-if="instanceInfo"
        >
          Stop
        </wired-button>
        <div
          v-if="instanceInfo"
          class="mt-4 p-4 rounded text-white text-center"
          :class="{
            'bg-green-500': instanceInfo.state === 'RUNNING',
            'bg-yellow-500': instanceInfo.state === 'CREATING',
            'bg-red-500': !instanceInfo,
          }"
        >
          <p class="font-bold">Status: {{ instanceInfo.state }}</p>
          <div v-if="instanceInfo.state === 'RUNNING'" class="mt-2">
            <p class="font-semibold mb-2">Connection Info:</p>
            <ul>
              <li
                v-for="info in instanceInfo.connectionInfo"
                :key="info.host + info.port"
              >
                <a
                  v-if="info.protocol === ConnectionProtocol.Https"
                  :href="`https://${info.host}:${info.port}`"
                  target="_blank"
                  class="underline"
                  >https://{{ info.host }}:{{ info.port }}</a
                >
                <pre v-else-if="info.protocol == ConnectionProtocol.TcpTls">
ncat --ssl {{ info.host }} {{ info.port }}</pre
                >
                <pre v-else-if="info.protocol == ConnectionProtocol.Tcp">
ncat {{ info.host }} {{ info.port }}</pre
                >
                <div
                  v-else-if="
                    info.protocol == ConnectionProtocol.Ssh &&
                    info.sshUsername &&
                    info.sshPassword
                  "
                >
                <pre>ssh {{ info.sshUsername }}@{{ info.host }} -p {{ info.port }}
Password: {{ info.sshPassword }}</pre>
</div
                >
                <span v-else
                  >{{ info.protocol }}://{{ info.host }}:{{ info.port }}</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <form v-if="!solved">
        <wired-input
          placeholder="plfanzen{hautpeingang}"
          ref="flagInput"
          class="w-full"
          @keyup="showFlagStatus = false"
          @keydown.enter="checkFlagWithServer"
        />
        <wired-button @click="checkFlagWithServer" class="mt-4 w-full">
          Submit Falg
        </wired-button>
      </form>
      <wired-card
        class="w-full mt-4 text-center text-white"
        elevation="3"
        v-else
        fill="#4CAF50"
      >
        <p>Challenge already solved!</p>
      </wired-card>

      <wired-card
        class="w-full mt-4 text-center text-white"
        elevation="3"
        v-if="showFlagStatus && validFlagFor"
        fill="#4CAF50"
      >
        <p v-if="validFlagFor == props.challengeId">Correct flag!</p>
        <p v-else-if="validFlagFor">
          Flag correct for challenge ID: {{ validFlagFor }}
        </p>
      </wired-card>
      <wired-card
        class="w-full mt-4 text-center text-white"
        elevation="3"
        v-else-if="showFlagStatus && !validFlagFor"
        fill="#F44336"
      >
        <p>Incorrect flag</p>
      </wired-card>
    </wired-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { graphql } from "~/utils/gql";
import rough from "roughjs/bundled/rough.esm.js";
import { ConnectionProtocol } from "~/utils/gql/graphql";

const flagInput = ref<HTMLElement | null>(null);
const dialog = ref<HTMLDialogElement | null>(null);

async function openDialog() {
  if (dialog.value && !dialog.value.open) {
    dialog.value.open = true;
    while (dialog.value.open) {
      dialog.value.shadowRoot
        ?.querySelector("#overlay")
        ?.addEventListener("click", () => {
          dialog.value!.open = false;
        });
      dialog.value.shadowRoot
        ?.querySelector("#overlay wired-card")
        ?.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      if (
        dialog.value.shadowRoot?.querySelector("#overlay") == null ||
        dialog.value.shadowRoot?.querySelector("#overlay wired-card") == null
      ) {
        console.warn("Dialog overlay not found, retrying...");
      } else {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}

const emit = defineEmits(["launch", "stop"]);

const props = defineProps({
  challengeId: String,
  title: String,
  points: Number,
  backgroundColor: {
    type: String,
    default: "#fdf6e3",
  },
  description: {
    type: String,
    default: "No description provided",
  },
  flag: {
    type: String,
    optional: true,
  },
  difficulty: {
    type: String,
    optional: true,
  },
  difficultyColor: {
    type: String,
    optional: true,
  },
  instanceInfo: {
    type: Object as PropType<{
      state: string;
      connectionInfo: {
        port: number;
        host: string;
        protocol: ConnectionProtocol;
        sshUsername?: string;
        sshPassword?: string;
      }[];
    }>,
    optional: true,
  },
  solved: {
    type: Boolean,
    optional: true,
  },
  solves: {
    type: Number,
    optional: true,
  },
  canExport: {
    type: Boolean,
    optional: true,
  },
  canStart: {
    type: Boolean,
    optional: true,
  },
  attachments: {
    type: Array as PropType<string[]>,
    optional: true,
  },
});

const canvas = ref<HTMLCanvasElement | null>(null);
const card = ref<null | HTMLElement>(null);

const PADDING = 8;

const drawSketch = () => {
  const c = canvas.value;
  const el = card.value;
  if (!c || !el) return;

  const rc = rough.canvas(c);

  // Match the canvas size to the card
  c.width = el.clientWidth;
  c.height = el.clientHeight;

  // Clear canvas
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, c.width, c.height);

  // Draw rough border
  rc.rectangle(
    PADDING,
    PADDING,
    c.width - PADDING * 2,
    c.height - PADDING * 2,
    {
      roughness: 1.5,
      stroke: props.backgroundColor,
      strokeWidth: 1,

      fill: props.backgroundColor,
      fillStyle: "sunburst",
      hachureAngle: -60,
      hachureGap: 7.5,
    }
  );
};

onMounted(async () => {
  await nextTick();
  drawSketch();
});

watch(
  () => [props.title, props.description],
  () => {
    drawSketch();
  }
);

const showFlagStatus = ref(false);

const launchChallengeInstanceMutation = graphql(`
  mutation launchChallengeInstance($challengeId: String!) {
    launchChallengeInstance(challengeId: $challengeId)
  }
`);

const stopChallengeInstanceMutation = graphql(`
  mutation stopChallengeInstance($challengeId: String!) {
    stopChallengeInstance(challengeId: $challengeId)
  }
`);

const { mutate: launchChallengeInstance } = useMutation(
  launchChallengeInstanceMutation
);

const { mutate: stopChallengeInstance } = useMutation(
  stopChallengeInstanceMutation
);

function launchInstance() {
  launchChallengeInstance({ challengeId: props.challengeId! }).then((res) => {
    console.log("Launched challenge instance:", res);
    emit("launch");
  });
}

function stopInstance() {
  stopChallengeInstance({ challengeId: props.challengeId! }).then((res) => {
    console.log("Stopped challenge instance:", res);
    emit("stop");
  });
}

const submitFlagMutation = graphql(`
  mutation submitFlag($challengeId: String!, $flag: String!) {
    submitFlag(challengeId: $challengeId, flag: $flag)
  }
`);

const { mutate: submitFlag } = useMutation(submitFlagMutation);

const validFlagFor = ref<string | null>(null);

async function checkFlagWithServer() {
  const { data } =
    (await submitFlag({
      challengeId: props.challengeId!,
      flag: flagInput.value?.value || "",
    })) || {};
  if (data?.submitFlag) {
    validFlagFor.value = data?.submitFlag;
  } else {
    validFlagFor.value = null;
  }
  showFlagStatus.value = true;
}

const { getToken } = useApollo();
const runtimeConfig = useRuntimeConfig();

async function downloadSrc() {
  const token = await getToken();
  const response = await fetch(
    `${runtimeConfig.public.browserApiBaseUrl}/export-challenge/${props.challengeId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    alert("Failed to download source code.");
    return;
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${props.challengeId}.tar.gz`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

async function downloadAttachment(attachmentName: string) {
  const token = await getToken();
  const response = await fetch(
    `${runtimeConfig.public.browserApiBaseUrl}/retrieve-file/${props.challengeId}/${attachmentName}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    alert("Failed to download attachment.");
    return;
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = attachmentName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
</script>
