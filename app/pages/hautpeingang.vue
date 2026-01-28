<template>
  <div class="flex flex-col items-center p-8 w-full h-full">
    <hgroup class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-1">Hautpeingang</h1>
      <h4>Log in to start plfanzing</h4>
    </hgroup>
    <form
      class="flex items-center justify-center flex-col w-full max-w-md gap-4"
      @submit.prevent="login"
    >
      <UFormField label="Username">
        <UInput
          placeholder="Your username"
          class="w-full"
          v-model="username"
          autocomplete="username"
        />
      </UFormField>
      <UFormField label="Password">
        <UInput
          placeholder="Your password"
          class="w-full"
          type="password"
          v-model="password"
          autocomplete="current-password"
        />
      </UFormField>
      <UButton @click.prevent="login" class="mt-4"> Log In </UButton>
    </form>
    <NuxtLink to="/register" class="mt-4 text-blue-600 hover:underline">
      Don't have an account? Register here.
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";

const username = ref("");
const password = ref("");
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
      username: username.value || "",
      password: password.value || "",
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
