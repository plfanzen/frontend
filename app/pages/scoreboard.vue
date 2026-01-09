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
      actor
      solves {
        challenge {
          points
          solves
        }
        solvedAt
      }
    }
  }
`);

const { data: solvesInfo } = await useAsyncQuery(solvesQuery);

const infoBySolveActor = computed(() => {
  if (!solvesInfo.value) return {};

  const result: Record<string, any> = {};
  for (const user of solvesInfo.value.users) {
    for (const solve of user.solves) {
      if (!result[user.actor]) {
        result[user.actor] = [];
      }
      result[user.actor].push({
        username: user.username,
        points: solve.challenge.points,
        solvedAt: solve.solvedAt,
      });
    }
  }
  return result;
});
</script>
