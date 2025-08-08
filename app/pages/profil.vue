<template>
  <div class="flex flex-col p-4 max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-gray-800 text-center">Your Profil</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- User Info -->
      <div class="lg:col-span-1">
        <wired-card elevation="3" class="p-6">
          <div class="text-center">
            <div class="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-2xl font-bold text-gray-600">{{ userInfo.username.charAt(0).toUpperCase() }}</span>
            </div>
            <h2 class="text-xl font-bold mb-2">{{ userInfo.username }}</h2>
            <p class="text-gray-600 mb-4">{{ userInfo.email }}</p>
            
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span>Rank:</span>
                <span class="font-semibold">#{{ userInfo.rank }}</span>
              </div>
              <div class="flex justify-between">
                <span>Total Ponts:</span>
                <span class="font-semibold text-blue-600">{{ userInfo.totalPoints }}</span>
              </div>
              <div class="flex justify-between">
                <span>Solves:</span>
                <span class="font-semibold">{{ userInfo.solves }}</span>
              </div>
              <div class="flex justify-between">
                <span>Tema:</span>
                <span class="font-semibold">{{ userInfo.team || 'No tema' }}</span>
              </div>
            </div>
            
            <wired-button class="mt-4 w-full">
              Edit Profil
            </wired-button>
          </div>
        </wired-card>
      </div>
      
      <!-- Recent Activity -->
      <div class="lg:col-span-2">
        <h2 class="text-2xl font-bold mb-4 text-gray-700">Recnt Activty</h2>
        <wired-card elevation="3" class="p-4">
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" 
                 class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                     :style="{ backgroundColor: activity.categoryColor }">
                  {{ activity.category.toUpperCase().charAt(0) }}
                </div>
                <div>
                  <div class="font-semibold">{{ activity.challenge }}</div>
                  <div class="text-sm text-gray-600">{{ activity.time }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-bold text-green-600">+{{ activity.points }}</div>
                <div class="text-xs text-gray-500">ponts</div>
              </div>
            </div>
          </div>
        </wired-card>
        
        <!-- Challenge Progress -->
        <h2 class="text-2xl font-bold mb-4 mt-8 text-gray-700">Chalenge Progres</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="category in challengeProgress" :key="category.name"
               class="bg-white p-4 rounded-lg border-2"
               :style="{ borderColor: category.color }">
            <div class="text-center">
              <h3 class="font-bold mb-2" :style="{ color: category.color }">{{ category.name }}</h3>
              <div class="text-2xl font-bold">{{ category.solved }}/{{ category.total }}</div>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div class="h-2 rounded-full" 
                     :style="{ backgroundColor: category.color, width: (category.solved / category.total * 100) + '%' }">
                </div>
              </div>
              <div class="text-sm text-gray-600 mt-1">
                {{ Math.round(category.solved / category.total * 100) }}% complet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "wired-elements";

const userInfo = {
  username: "h4ck3r_pr0",
  email: "hacker@exmaple.com",
  rank: 1,
  totalPoints: 2850,
  solves: 12,
  team: "Cyrpto Crakrs"
};

const recentActivity = [
  { id: 1, challenge: "foresnic 2", category: "foresnic", categoryColor: "#2f4f4f", points: 99999, time: "2 hours ago" },
  { id: 2, challenge: "cyrpto 2", category: "cyrpto", categoryColor: "#32cd32", points: 250, time: "5 hours ago" },
  { id: 3, challenge: "wbe 2", category: "wbe", categoryColor: "#ff6347", points: 200, time: "1 day ago" },
  { id: 4, challenge: "rve 2", category: "rve", categoryColor: "#ffa500", points: 220, time: "2 days ago" },
  { id: 5, challenge: "pnw 2", category: "pnw", categoryColor: "#4682b4", points: 400, time: "3 days ago" },
];

const challengeProgress = [
  { name: "wbe", color: "#ff6347", solved: 2, total: 2 },
  { name: "pnw", color: "#4682b4", solved: 2, total: 2 },
  { name: "cyrpto", color: "#32cd32", solved: 2, total: 2 },
  { name: "rve", color: "#ffa500", solved: 2, total: 2 },
  { name: "foresnic", color: "#2f4f4f", solved: 2, total: 2 },
  { name: "msic", color: "#8a2be2", solved: 2, total: 2 },
];
</script>