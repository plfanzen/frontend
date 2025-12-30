<template>
  <div class="flex flex-col items-center p-8 w-full h-full">
    <pre>{{ JSON.stringify(syncStatus, undefined, 2) }}</pre>
    <button
      v-if="role === 'Admin'"
      @click="performSync"
      class="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
    >
      Sync Repository
    </button>
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";

const syncStatusQuery = graphql(`
  query getSyncStatus {
    syncStatus {
      commitHash
      commitTimestamp
      commitAuthor
      commitTitle
      isSynced
    }
  }
`);

const syncRepoMutation = graphql(`
  mutation syncRepo {
    syncRepo
  }
`);

const {
  data: syncStatus,
  error,
  refresh: refreshSyncStatus,
} = await useAsyncQuery(syncStatusQuery);
const { mutate: syncRepoMutate } = useMutation(syncRepoMutation);

let role = await getRole();

async function performSync() {
  try {
    await syncRepoMutate();
    await refreshSyncStatus();
  } catch (err) {
    console.error("Error during repository sync:", err);
  }
}
</script>
