<template>
  <div class="p-8">
    <MDC
      :value="eventInfo?.eventConfig.frontPageMd"
      tag="article"
      v-if="eventInfo?.eventConfig.frontPageMd"
    />
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";

const eventInfoQuery = graphql(`
  query getFrontPageMd {
    eventConfig {
      frontPageMd
    }
  }
`);

const { data: eventInfo, error } = await useAsyncQuery(eventInfoQuery);

const { getToken } = useApollo();

if (error.value) {
  console.error("Error fetching event info:", error.value);
  const token = await getToken();
  if (!token) {
    await navigateTo("/hautpeingang");
  }
}

watch(error, async (e) => {
  if (e) {
    const token = await getToken();
    if (!token) {
      await navigateTo("/hautpeingang");
    }
  }
});
</script>
