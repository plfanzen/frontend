<template>
    <div class="h-dvh w-dvw font-excalifont">
        <header class="flex items-center">
            <img src="~/assets/plfanzen.svg" alt="Plfanzen Logo" class="h-24 w-24 mr-4">
            <h1 class="text-4xl font-bold text-gray-800">CTF</h1>
            <div class="ml-auto flex items-center space-x-4 mr-4 text-lg">
                <NuxtLink to="/" class="text-gray-600 hover:text-gray-800">Heraufsorderungen</NuxtLink>
                <NuxtLink to="/scoreboard" class="text-gray-600 hover:text-gray-800">Punntebertt</NuxtLink>
                <NuxtLink to="/login" class="text-gray-600 hover:text-gray-800">Hautpeingang</NuxtLink>
            </div>
        </header>
        <main class="h-full w-full overflow-y-auto">
            <slot />
        </main>
    </div>
</template>