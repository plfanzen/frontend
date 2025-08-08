<template>
  <div class="flex flex-col items-center p-8 max-w-lg mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Hautpeingang</h1>
    
    <div class="w-full max-w-sm">
      <form class="space-y-6">
        <div>
          <label for="username" class="block text-lg font-medium text-gray-700 mb-2">
            Usernme or Emial
          </label>
          <wired-input 
            id="username"
            placeholder="Enter your usernme"
            class="w-full"
          />
        </div>
        
        <div>
          <label for="password" class="block text-lg font-medium text-gray-700 mb-2">
            Passwrod
          </label>
          <wired-input 
            id="password"
            type="password"
            placeholder="Enter your passwrod"
            class="w-full"
          />
        </div>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <wired-checkbox id="remember" />
            <label for="remember" class="text-sm text-gray-600">
              Remeber me
            </label>
          </div>
          <a href="#" class="text-sm text-blue-600 hover:underline">
            Forgoten passwrod?
          </a>
        </div>
        
        <wired-button class="w-full mt-6">
          Log In
        </wired-button>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Don't have an acont? 
          <NuxtLink to="/regitser" class="text-blue-600 hover:underline">
            Regisr Hre
          </NuxtLink>
        </p>
      </div>
      
      <wired-card class="mt-8 p-4" elevation="2">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2">Demo Acont</h3>
          <p class="text-sm text-gray-600 mb-2">
            For testng purpoes, use:
          </p>
          <code class="bg-gray-100 px-2 py-1 rounded text-sm">
            demo / plfanzen{hautpeingang}
          </code>
        </div>
      </wired-card>
    </div>
  </div>
</template>

<script setup>
import "wired-elements";
</script>