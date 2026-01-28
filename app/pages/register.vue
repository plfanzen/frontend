<template>
  <div class="flex flex-col items-center p-8 w-full h-full">
    <hgroup class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-1">Regitser</h1>
      <h4>Plfanz your account here</h4>
    </hgroup>
    <form
      class="flex items-center justify-center flex-col w-full max-w-sm gap-4"
      @submit.prevent="createAccount"
    >
      <UFormField label="Username">
        <UInput
          placeholder="Your username"
          class="w-full"
          v-model="username"
          autocomplete="username"
        />
      </UFormField>
      <UFormField label="Email">
        <UInput
          placeholder="Your email address"
          class="w-full"
          v-model="email"
          type="email"
          autocomplete="email"
        />
      </UFormField>
      <UFormField label="Password">
        <UInput
          placeholder="Your password"
          class="w-full"
          type="password"
          v-model="password"
          autocomplete="new-password"
        />
      </UFormField>
      <UButton @click.prevent="createAccount"> Create account </UButton>
    </form>
    <NuxtLink to="/hautpeingang" class="mt-4 text-blue-600 hover:underline">
      Already have an account? Enter through the Hautpeingang.
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";

const refreshToken = useCookie("refreshToken");

const username = ref("");
const email = ref("");
const password = ref("");

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
  if (
    !username.value ||
    !email.value ||
    !password.value
  ) {
    alert("Please fill in all fields.");
    return;
  }
  try {
    const resp = await registerMutate({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    console.log("Account creation successful:", resp);
  } catch (error) {
    alert("Account creation failed: " + error);
  }

  try {
    const response = await loginMutate({
      username: username.value,
      password: password.value,
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
