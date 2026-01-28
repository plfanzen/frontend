<template>
  <UContainer>
    <UTable :data="allSolves" :columns />
  </UContainer>
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { graphql } from "~/utils/gql";

const solvesQuery = graphql(`
  query getAllSubmittedFlags {
    users {
      username
      actor
      solves {
        challenge {
          id
          name
        }
        solvedAt
        submittedFlag
      }
    }
  }
`);

const { data: solvesInfo } = await useAsyncQuery(solvesQuery);

type Solve = {
  username: string;
  challengeName: string;
  submittedFlag: string;
  solvedAt: string;
};
const allSolves = computed(() => {
  return (
    solvesInfo.value?.users.flatMap((user) =>
      user.solves.map((solve) => ({
        username: user.username,
        challengeName: solve.challenge.name,
        submittedFlag: solve.submittedFlag,
        solvedAt: solve.solvedAt,
      })),
    ) ?? []
  ).toSorted(
    (a, b) => new Date(b.solvedAt).getTime() - new Date(a.solvedAt).getTime(),
  );
});

const columns: TableColumn<Solve>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "solvedAt",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("solvedAt")).toLocaleString(
        navigator?.language,
        {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        },
      );
    },
  },
  {
    accessorKey: "challengeName",
    header: "Challenge",
  },
  {
    accessorKey: "submittedFlag",
    header: "Submitted Flag",
  },
];
</script>
