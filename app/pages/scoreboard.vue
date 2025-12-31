<template>
  <div>
    <pre>{{ JSON.stringify(solvesInfo, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";

const solvesQuery = graphql(`
  query getAllSolves {
    users {
      username
      solves {
        challenge {
          points
        }
        actor
        solvedAt
      }
    }
  }
`);

const { data: solvesInfo } = await useAsyncQuery(solvesQuery);
</script>
