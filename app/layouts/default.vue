<template>
  <div class="h-dvh w-dvw">
    <header class="flex items-center w-full gap-4">
      <NuxtLink to="/" class="flex items-center">
        <img
          src="~/assets/plfanzen.svg"
          alt="Plfanzen Logo"
          class="h-24 w-24 mr-4"
        />
        <h1 class="text-xl font-bold text-gray-800">
          {{ eventInfo?.eventConfig.eventName || "Unnamed CTF" }}
        </h1>
      </NuxtLink>
      <div
        class="ml-4 flex items-center gap-4 mr-4 text-lg w-full flex-grow px-2"
      >
        <NuxtLink
          to="/challenges"
          class="text-gray-600 hover:text-gray-800"
          v-if="isLoggedIn"
          >Heraufsorderungen</NuxtLink
        >
        <NuxtLink to="/rules" class="text-gray-600 hover:text-gray-800"
          >Reglen</NuxtLink
        >
        <NuxtLink to="/scoreboard" class="text-gray-600 hover:text-gray-800"
          >Puntkebertt</NuxtLink
        >
        <NuxtLink
          to="/admin/sync"
          class="text-gray-600 hover:text-gray-800"
          v-if="role === 'Author' || role === 'Admin'"
          >Repository Sync</NuxtLink
        >
        <NuxtLink
          to="/profile"
          class="text-gray-600 hover:text-gray-800 ml-auto"
          v-if="isLoggedIn"
          >Mein Profil</NuxtLink
        >
        <NuxtLink
          to="/hautpeingang"
          class="text-gray-600 hover:text-gray-800 ml-auto"
          v-else
          >Hautpeingang</NuxtLink
        >
        <button
          v-if="isLoggedIn"
          @click="endSession"
          class="text-gray-600 hover:text-gray-800"
        >
          Abmelden
        </button>
      </div>
    </header>
    <main class="h-full w-full overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";

const refreshToken = useCookie("refreshToken");
let role = ref<"Player" | "Author" | "Admin" | null>(await getRole());

// Refreshtoken is a JWT, so we can decide if the user is logged in by checking its presence and validity
const isLoggedIn = computed(() => {
  if (!refreshToken.value) {
    return false;
  }
  try {
    const payload = JSON.parse(atob(refreshToken.value.split(".")[1]!));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp > now;
  } catch {
    return false;
  }
});

watch(
  isLoggedIn,
  async (newValue) => {
    if (newValue) {
      role.value = await getRole();
    } else {
      role.value = null;
    }
  },
  { immediate: true }
);

const { onLogin, onLogout } = useApollo();

const eventInfoQuery = graphql(`
  query getBasicEventInfo {
    eventConfig {
      eventName
    }
  }
`);

const { data: eventInfo } = await useAsyncQuery(eventInfoQuery);

const refreshSessionMutation = graphql(`
  mutation refreshSession($refreshToken: String!) {
    refreshSession(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`);

const endSessionMutation = graphql(`
  mutation endSession($refreshToken: String!) {
    endSession(refreshToken: $refreshToken)
  }
`);

const { mutate: refreshSessionMutate } = useMutation(refreshSessionMutation);
const { mutate: endSessionMutate } = useMutation(endSessionMutation);

async function refreshSession() {
  if (isLoggedIn.value) {
    try {
      await refreshSessionMutate({
        refreshToken: refreshToken.value || "",
      }).then((response) => {
        if (response?.data?.refreshSession.refreshToken) {
          onLogin(response.data.refreshSession.accessToken);
          refreshToken.value = response.data.refreshSession.refreshToken;
        }
      });
    } catch (error) {
      console.error(error);
      refreshToken.value = "";
      onLogout();
    }
  }
}

async function endSession() {
  if (refreshToken.value) {
    try {
      await endSessionMutate({
        refreshToken: refreshToken.value,
      });
      onLogout();
      refreshToken.value = "";
    } catch (error) {
      console.error(error);
    }
  }
}

await refreshSession();

const interval = ref<number | null>(null);
onMounted(() => {
  interval.value = window.setInterval(
    () => {
      refreshSession();
    },
    5 * 60 * 1000
  ); // Refresh every 5 minutes
});

onBeforeUnmount(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
});
</script>

<style>
html,
body {
  font-family: Excalifont, sans-serif;
}
</style>
