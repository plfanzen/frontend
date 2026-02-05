<template>
  <UInput
    ref="copyInputField"
    :model-value="value"
    type="text"
    readonly
    :ui="{ trailing: 'pe-2' }"
  >
    <template #trailing>
      <UIcon
        name="i-heroicons-document-duplicate"
        class="size-5 cursor-pointer text-black dark:text-white"
        @click="copyText()"
      />
    </template>
  </UInput>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

const copyInputField = ref<{ $el: HTMLElement } | null>(null);

async function copyText() {
  const copyText = copyInputField.value!.$el.querySelector(
    "input",
  )!;
  // Selection is purely as visual feedback
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  // Legacy copy method for older browsers
  document.execCommand("copy");
  await navigator.clipboard.writeText(props.value);
  window.setTimeout(() => {
    copyText.blur();
    window.getSelection()?.removeAllRanges();
  }, 1000);
}
</script>
