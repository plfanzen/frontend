<template>
  <div class="flex flex-col items-center p-8 w-full h-full">
    <hgroup class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-1">Regitser</h1>
      <h4>Plfanz your account here</h4>
    </hgroup>
    <form
      class="flex items-center justify-center flex-col w-full max-w-sm"
      @submit.prevent="createAccount"
    >
      <wired-input
        placeholder="Your username"
        class="w-full"
        ref="usernameInput"
        @keyup.enter.prevent="createAccount"
        autocomplete="username"
      />
      <wired-input
        placeholder="Your email address"
        class="w-full"
        ref="emailInput"
        type="email"
        @keyup.enter.prevent="createAccount"
        autocomplete="email"
      />
      <wired-input
        placeholder="Your password"
        class="w-full"
        type="password"
        ref="passwordInput"
        @keyup.enter.prevent="createAccount"
        autocomplete="new-password"
      />
      <wired-button @click.prevent="createAccount" class="mt-4"> Create account </wired-button>
    </form>
    <NuxtLink to="/hautpeingang" class="mt-4 text-blue-600 hover:underline">
      Already have an account? Enter through the Hautpeingang.
    </NuxtLink>
    <img src="~/assets/ssl.png" alt="SSL Secured" class="mt-8 h-24" />
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";

const refreshToken = useCookie("refreshToken");

const usernameInput = ref<HTMLInputElement | null>(null);
const emailInput = ref<HTMLInputElement | null>(null);
const passwordInput = ref<HTMLInputElement | null>(null);

const loginMutation = graphql(`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      refreshToken
      accessToken
    }
  }
`);

const registerMutation = graphql(`
  mutation register($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password)
  }
`);

const { mutate: loginMutate } = useMutation(loginMutation);
const { mutate: registerMutate } = useMutation(registerMutation);
const { onLogin } = useApollo();

async function createAccount() {
  if (!usernameInput?.value?.value || !emailInput.value?.value || !passwordInput.value?.value) {
    alert("Please fill in all fields.");
    return;
  }
  try {
    const resp = await registerMutate({
      username: usernameInput.value?.value || "",
      email: emailInput.value?.value || "",
      password: passwordInput.value?.value || "",
    });
    console.log("Account creation successful:", resp);
  } catch (error) {
    alert("Account creation failed: " + error);
  }
  
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
