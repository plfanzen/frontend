<template>
  <div class="flex flex-col items-center p-8 w-full h-full">
    <hgroup class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-1">Hautpeingang</h1>
      <h4>Log in to start plfanzing</h4>
    </hgroup>
    <form
      class="flex items-center justify-center flex-col w-full max-w-sm"
      @submit.prevent="login"
    >
      <wired-input
        placeholder="Your username"
        class="w-full"
        ref="usernameInput"
        @keyup.enter.prevent="login"
        autocomplete="username"
      />
      <wired-input
        placeholder="Your password"
        class="w-full"
        type="password"
        ref="passwordInput"
        @keyup.enter.prevent="login"
        autocomplete="current-password"
      />
      <wired-button @click.prevent="login" class="mt-4"> Log In </wired-button>
    </form>
    <NuxtLink to="/register" class="mt-4 text-blue-600 hover:underline">
      Don't have an account? Regitser here.
    </NuxtLink>
    <img src="~/assets/ssl.png" alt="SSL Secured" class="mt-8 h-24" />
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";

const usernameInput = ref<HTMLInputElement | null>(null);
const passwordInput = ref<HTMLInputElement | null>(null);
const refreshToken = useCookie("refreshToken");

const loginMutation = graphql(`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      refreshToken
      accessToken
    }
  }
`);

const { mutate: loginMutate } = useMutation(loginMutation);
const { onLogin } = useApollo();

async function login() {
  try {
    const response = await loginMutate({
      username: usernameInput.value?.value || "",
      password: passwordInput.value?.value || "",
    });
    if (response?.data?.login.refreshToken) {
      onLogin(response.data.login.accessToken);
      refreshToken.value = response.data.login.refreshToken;
    }

    console.log("Login successful:", response);
    await navigateTo("/");
  } catch (error) {
    alert("Login failed: " + error);
  }
}
</script>
