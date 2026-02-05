<template>
  <div class="h-full flex flex-col">
    <UModal :title="title">
      <UCard
        class="cursor-pointer h-full flex flex-col"
        :ui="{ body: 'flex-1' }"
      >
        <template #header>
          <div class="flex justify-between items-center w-full">
            <h2 class="text-xl font-bold" :style="{ color: backgroundColor }">
              {{ title }}
            </h2>
            <UBadge v-if="solved">Solved</UBadge>
          </div>
        </template>
        <div class="flex-1">
          <MDC :value="getExcerpt(description)" tag="div" />
        </div>
        <template #footer>
          <div class="flex items-center justify-between w-full">
            <span class="text-sm">{{ points }} pts | {{ solves }} solves</span>
            <UBadge
              v-if="difficulty"
              :style="{
                backgroundColor: difficultyColor || '#666',
                color: 'contrast-color(' + (difficultyColor || '#666') + ')',
              }"
            >
              {{ difficulty }}
            </UBadge>
          </div>
        </template>
      </UCard>
      <template #body>
        <div>
          <MDC :value="description" tag="div" />

          <!-- Download buttons for attachments that call downloadAttachment -->
          <div v-if="attachments && attachments.length > 0" class="mt-4">
            <h3 class="font-semibold mb-2">Attachments:</h3>
            <div class="flex flex-col gap-2">
              <a
                v-for="(attachment, index) in attachments"
                :key="index"
                @click="downloadAttachment(attachment)"
                class="w-full cursor-pointer flex items-center gap-2 text-underline"
              >
                <UIcon name="i-heroicons-arrow-down-tray" class="size-5" />
                {{ attachment }}
              </a>
            </div>
          </div>
          <div v-if="canExport" class="mt-4">
            <UButton @click="downloadSrc" class="w-full">
              Download Source Code
            </UButton>
          </div>
          <UButton
            @click="launchInstance"
            class="mt-4 w-full"
            fill="#2196F3"
            v-if="!instanceInfo && canStart"
          >
            Launch
          </UButton>
          <UButton
            @click="stopInstance"
            class="mt-4 w-full"
            fill="#F44336"
            v-else-if="instanceInfo"
          >
            Stop
          </UButton>
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
                  <InputCopy
                    v-else-if="info.protocol == ConnectionProtocol.TcpTls"
                    :value="`ncat --ssl-verify ${info.host} ${info.port}`"
                  />
                  <InputCopy
                    v-else-if="info.protocol == ConnectionProtocol.Tcp"
                    :value="`ncat ${info.host} ${info.port}`"
                  />

                  <div
                    v-else-if="
                      info.protocol == ConnectionProtocol.Ssh &&
                      info.sshUsername &&
                      info.sshPassword
                    "
                    class="flex gap-2 flex-col"
                  >
                    <InputCopy
                      :value="`ssh ${info.sshUsername}@${info.host} -p ${info.port}`"
                    />
                    <div class="flex flex-row items-center justify-center mt-1 gap-2">
                      <span class="text-sm font-semibold">SSH Password:</span>
                      <InputCopy :value="info.sshPassword" />
                    </div>
                  </div>
                  <span v-else
                    >{{ info.protocol }}://{{ info.host }}:{{ info.port }}</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>

      <template #footer="{ close }">
        <div class="flex flex-col gap-4 w-full">
          <form v-if="!solved" @submit.prevent="checkFlagWithServer">
            <UInput
              placeholder="plfanzen{hautpeingang}"
              class="w-full"
              v-model="flag"
            />
            <UButton @click="checkFlagWithServer" class="mt-4 w-full">
              Submit Flag
            </UButton>
          </form>
          <UAlert
            v-else-if="!showFlagStatus"
            title="Already solved!"
            description="You've already solved this challenge!"
          />

          <UAlert
            v-if="showFlagStatus && validFlagFor"
            title="Challenge solved!"
            :description="
              validFlagFor == props.challengeId
                ? 'You have solved this challenge!'
                : 'You have submitted a correct flag for ' + validFlagFor
            "
          />
          <UAlert
            v-else-if="showFlagStatus && !validFlagFor"
            title="Incorrect flag!"
            description="The flag you submitted is incorrect. Please try again."
          >
          </UAlert>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { graphql } from "~/utils/gql";
import { ConnectionProtocol } from "~/utils/gql/graphql";

const flag = ref("");

function getExcerpt(text: string): string {
  return text.split("\n")[0] || "";
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

onMounted(async () => {
  await nextTick();
});

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
  launchChallengeInstanceMutation,
);

const { mutate: stopChallengeInstance } = useMutation(
  stopChallengeInstanceMutation,
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
      flag: flag.value || "",
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
    },
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
    },
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
