<template>
  <div ref="card" class="relative px-4 py-8 mb-6 bg-white text-black cursor-pointer select-none">
    <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full pointer-events-none z-0"></canvas>
    <div class="relative z-10 flex items-center justify-center flex-col text-center" :style="{ color: backgroundColor }">
      <h2 class="text-xl font-bold">{{ title }}</h2>
      <p class="mt-2 text-sm">{{ points }} pts</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import rough from 'roughjs/bundled/rough.esm.js'

const props = defineProps({
  title: String,
  points: Number,
  backgroundColor: {
    type: String,
    default: '#fdf6e3'
  },
})

const canvas = ref(null)
const card = ref(null)

const PADDING = 8;

const drawSketch = () => {
  const c = canvas.value
  const el = card.value
  if (!c || !el) return

  const rc = rough.canvas(c)

  // Match the canvas size to the card
  c.width = el.clientWidth
  c.height = el.clientHeight

  // Clear canvas
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, c.width, c.height)

  // Draw rough border
  rc.rectangle(PADDING, PADDING, c.width - PADDING * 2, c.height - PADDING * 2, {
    roughness: 1.5,
    stroke:  props.backgroundColor,
    strokeWidth: 1,
    
    fill: props.backgroundColor,
    fillStyle: 'sunburst',
    hachureAngle: -60,
    hachureGap: 7.5,
  })
}

onMounted(() => {
  drawSketch()
})

watch(() => [props.title, props.description], () => {
  drawSketch()
})
</script>
