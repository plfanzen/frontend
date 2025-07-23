<template>
  <div class="h-dvh w-dvw">
    <header class="flex items-center w-full gap-4">
      <NuxtLink to="/" class="flex items-center">
        <img
          src="~/assets/plfanzen.svg"
          alt="Plfanzen Logo"
          class="h-24 w-24 mr-4"
        />
        <h1 class="text-4xl font-bold text-gray-800">CFT</h1>
      </NuxtLink>
      <div
        class="ml-4 flex items-center gap-4 mr-4 text-lg w-full flex-grow px-2"
      >
        <NuxtLink to="/" class="text-gray-600 hover:text-gray-800"
          >Heraufsorderungen</NuxtLink
        >
        <NuxtLink to="/puntkebertt" class="text-gray-600 hover:text-gray-800"
          >Puntkebertt</NuxtLink
        >
        <NuxtLink
          to="/hautpeingang"
          class="text-gray-600 hover:text-gray-800 ml-auto"
          >Hautpeingang</NuxtLink
        >
      </div>
    </header>
    <main class="h-full w-full overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<style>
html, body {
  font-family: Excalifont, sans-serif;
}
</style>
