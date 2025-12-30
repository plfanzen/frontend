<script setup lang="ts">
defineProps<{
    href?: string
    target?: string
}>()
</script>

<template>
    <a :href="href" :target="target" class="text-blue-600 dark:text-blue-400 hover:underline">
        <slot />
    </a>
</template>
