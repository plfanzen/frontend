<template>
  <UHeader>
    <template #title>
      <div class="flex items-center">
        <img
          src="~/assets/plfanzen.svg"
          alt="Plfanzen Logo"
          class="h-18 w-18 mr-4"
        />
        <h1 class="text-xl font-bold hidden md:inline-block">
          {{ eventInfo?.eventConfig.eventName || "CTF" }}
        </h1>
      </div>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UButton
        v-if="isLoggedIn"
        @click="endSession"
        class="text-gray-600 hover:text-gray-800 hidden md:inline-flex items-center justify-center"
        icon="i-lucide-log-out"
      >
        Abmelden
      </UButton>
      <UButton
        v-else
        to="/hautpeingang"
        class="text-gray-600 hover:text-gray-800 hidden md:inline-flex items-center justify-center"
        icon="i-lucide-log-in"
      >
        Hautpeingang
      </UButton>
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";
import type { NavigationMenuItem } from "@nuxt/ui";

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
  { immediate: true },
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
onMounted(async () => {
  interval.value = window.setInterval(
    () => {
      refreshSession();
    },
    5 * 60 * 1000,
  ); // Refresh every 5 minutes
});

onBeforeUnmount(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
});

const route = useRoute();

/*

<header class="flex items-center w-full gap-4">
      <NuxtLink to="/" class="flex items-center">
        <img
          src="~/assets/plfanzen.svg"
          alt="Plfanzen Logo"
          class="h-24 w-24 mr-4"
        />
        <h1 class="text-xl font-bold">
          {{ eventInfo?.eventConfig.eventName || "Unnamed CTF" }}
        </h1>
      </NuxtLink>
      <div class="ml-4 flex items-center gap-4 mr-4 text-lg w-full grow px-2">
        <ULink to="/challenges" v-if="isLoggedIn">Heraufsorderungen</ULink>
        <ULink to="/rules">Reglen</ULink>
        <ULink to="/scoreboard">Puntkebertt</ULink>
        <ULink to="/admin/sync" v-if="role === 'Author' || role === 'Admin'"
          >Repository Sync</ULink
        >
        <ULink to="/profile" v-if="isLoggedIn">Mein Profil</ULink>
        <ULink to="/hautpeingang" v-else>Hautpeingang</ULink>
        <button
          v-if="isLoggedIn"
          @click="endSession"
          class="text-gray-600 hover:text-gray-800"
        >
          Abmelden
        </button>
        <UColorModeButton />
      </div>
    </header>*/
const items = computed<NavigationMenuItem[]>(() => {
  const base: NavigationMenuItem[] = [
    {
      label: "Rules",
      to: "/rules",
      active: route.path.startsWith("/rules"),
    },
    {
      label: "Scoreboard",
      to: "/scoreboard",
      active: route.path.startsWith("/scoreboard"),
    },
  ];
  if (isLoggedIn.value) {
    base.unshift({
      label: "Challenges",
      to: "/challenges",
      active: route.path.startsWith("/challenges"),
    });
    base.push({
      label: "My Profile",
      to: "/profile",
      active: route.path.startsWith("/profile"),
    });
    if (role.value === "Author" || role.value === "Admin") {
      base.push({
        label: "Administration",
        active: route.path.startsWith("/admin"),
        children: [
          {
            label: "Repository Sync",
            to: "/admin/sync",
            active: route.path.startsWith("/admin/sync"),
          },
        ],
      });
    }
  }
  return base;
});
</script>
