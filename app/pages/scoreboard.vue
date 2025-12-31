<template>
  <div>
    <pre>{{ JSON.stringify(solvesInfo, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";

const solvesQuery = graphql(`
  query getAllSolves {
    solves {
      solvedAt
      user {
        username
      }
      challenge {
        points
        id
        name
      }
    }
  }
`);

const { data: solvesInfo } = await useAsyncQuery(solvesQuery);
</script>
