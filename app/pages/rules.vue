<template>
  <div class="p-8">
    <MDC :value="rulesInfo?.eventConfig.rulesMd" tag="article" />
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";

const rulesQuery = graphql(`
  query getRulesMd {
    eventConfig {
      rulesMd
    }
  }
`);

const { data: rulesInfo } = await useAsyncQuery(rulesQuery);
</script>
