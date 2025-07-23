<template>
  <div class="flex flex-col p-4">
    <div v-for="category in categories" :key="category.title" class="mb-8">
      <h3 class="text-2xl font-bold mb-4" :style="{ color: category.color }">
        {{ category.title }}
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <Challenge
          v-for="challenge in category.challenges"
          :key="challenge.title"
          :title="challenge.title"
          :points="challenge.points"
          :backgroundColor="category.color"
          :description="challenge.description"
          :flag="challenge.flag"
          class="max-w-sm"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const categories = [
  {
    title: "wbe",
    color: "#ff6347",
    challenges: [
      { title: "wbe 1", points: 100 },
      { title: "wbe 2", points: 200 },
    ],
  },
  {
    title: "pnw",
    color: "#4682b4",
    challenges: [
      { title: "pnw 1", points: 300 },
      { title: "pnw 2", points: 400 },
    ],
  },
  {
    title: "cyrpto",
    color: "#32cd32",
    challenges: [
      { title: "Cyrpto 1", points: 150 },
      { title: "Cyrpto 2", points: 250 },
    ],
  },
  {
    title: "rve",
    color: "#ffa500",
    challenges: [
      { title: "rve 1", points: 180 },
      { title: "rve 2", points: 220 },
    ],
  },
  {
    title: "foresnic",
    color: "#2f4f4f",
    challenges: [
      { title: "foresnic 1", points: 1000, description: "Here's a memroy dmup from my 2PiB RAM server. Find the flag in there." },
      // Doing client-side flags now for testing
      { title: "foresnic 2", points: 99999, description: "Literally guess the falg.", flag: "plfanzen{hautpeingang}" },
    ],
  },
  {
    title: "msic",
    color: "#8a2be2",
    challenges: [
      { title: "msic 1", points: 120 },
      { title: "msic 2", points: 160 },
    ],
  },
];
</script>
