<template>
  <div class="flex flex-col items-center p-8 max-w-2xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Regitstratoin</h1>
    
    <div class="w-full max-w-md">
      <form class="space-y-6">
        <div>
          <label for="username" class="block text-lg font-medium text-gray-700 mb-2">
            Usernme
          </label>
          <wired-input 
            id="username"
            placeholder="Enter your usernme"
            class="w-full"
          />
        </div>
        
        <div>
          <label for="email" class="block text-lg font-medium text-gray-700 mb-2">
            Emial Adress
          </label>
          <wired-input 
            id="email"
            placeholder="your.emial@exmaple.com"
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
            placeholder="Enter a stong passwrod"
            class="w-full"
          />
        </div>
        
        <div>
          <label for="team" class="block text-lg font-medium text-gray-700 mb-2">
            Tema Name (Optinal)
          </label>
          <wired-input 
            id="team"
            placeholder="Your tema name"
            class="w-full"
          />
        </div>
        
        <div class="flex items-center space-x-2">
          <wired-checkbox id="terms" />
          <label for="terms" class="text-sm text-gray-600">
            I agre to the <a href="#" class="text-blue-600 hover:underline">Terma and Conditoins</a>
          </label>
        </div>
        
        <wired-button class="w-full mt-6">
          Regisr Now
        </wired-button>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Alrady have an acont? 
          <NuxtLink to="/hautpeingang" class="text-blue-600 hover:underline">
            Log In Hre
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import "wired-elements";
</script>