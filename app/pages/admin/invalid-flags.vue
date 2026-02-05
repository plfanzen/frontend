<template>
  <UContainer>
    <UTable :data="allInvalidSubmissions" :columns />
  </UContainer>
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { graphql } from "~/utils/gql";

const solvesQuery = graphql(`
  query getAllInvalidFlags {
    users {
      username
      actor
      invalidSubmissions {
        challenge {
          id
          name
        }
        submittedFlag
        submittedAt
      }
    }
  }
`);

const { data: solvesInfo } = await useAsyncQuery(solvesQuery);

type Submission = {
  username: string;
  challengeName: string;
  submittedFlag: string;
  submittedAt: string;
};
const allInvalidSubmissions = computed(() => {
  return (
    solvesInfo.value?.users.flatMap((user) =>
      user.invalidSubmissions.map((submission) => ({
        username: user.username,
        challengeName: submission.challenge.name,
        submittedFlag: submission.submittedFlag,
        submittedAt: submission.submittedAt,
      })),
    ) ?? []
  ).toSorted(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
});

const columns: TableColumn<Submission>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "submittedAt",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("submittedAt")).toLocaleString(
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
