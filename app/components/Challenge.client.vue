<template>
  <DialogRoot>
    <DialogTrigger>
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
          <p class="mt-2 text-sm">{{ points }} pts</p>
        </div>
      </div>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-black/30 fixed inset-0 z-30" />
      <DialogContent
        class="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="m-0 text-2xl font-semibold">
          {{ title }}
        </DialogTitle>
        <DialogDescription class="mt-[10px] mb-5">
          {{ description }}
        </DialogDescription>
        <form>
          <wired-input
            placeholder="plfanzen{hautpeingang}"
            ref="flagInput"
            class="w-full"
            v-model="flag"
            @keyup="showFlagStatus = false"
            @keydown.enter="checkFlag"
          />
          <wired-button @click="checkFlag" class="mt-4 w-full">
            Submit Falg
          </wired-button>
        </form>

        <wired-card
          class="w-full mt-4 text-center text-white"
          elevation="3"
          v-if="showFlagStatus && isFlagCorrect"
          fill="#4CAF50"
        >
          <p>Correct flag</p>
        </wired-card>
        <wired-card
          class="w-full mt-4 text-center text-white"
          elevation="3"
          v-else-if="showFlagStatus && !isFlagCorrect"
          fill="#F44336"
        >
          <p>Incorrect flag</p>
        </wired-card>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup>
import "wired-elements";
import { onMounted, ref, watch } from "vue";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui";
import rough from "roughjs/bundled/rough.esm.js";

const flag = ref("");

const props = defineProps({
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
});

const canvas = ref(null);
const card = ref(null);

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
  const ctx = c.getContext("2d");
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
  console.log("Challenge component mounted");
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
const isFlagCorrect = ref(false);

const checkFlag = () => {
  console.log("Checking flag:", flag.value);
  if (flag.value === props.flag) {
    isFlagCorrect.value = true;
  } else {
    isFlagCorrect.value = false;
  }
  showFlagStatus.value = true;
};
</script>
