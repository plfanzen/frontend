<template>
  <div class="flex flex-col p-4">
    <h1 class="text-4xl font-bold mb-8 text-gray-800 text-center">Puntkebertt</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Individual Rankings -->
      <div>
        <h2 class="text-2xl font-bold mb-4 text-gray-700">Indivdual Rankigns</h2>
        <wired-card elevation="3" class="p-4">
          <div class="space-y-3">
            <div v-for="(player, index) in individualRankings" :key="player.username" 
                 class="flex items-center justify-between p-3 rounded-lg"
                 :class="index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-gray-100' : index === 2 ? 'bg-orange-100' : 'bg-white'">
              <div class="flex items-center space-x-3">
                <span class="text-lg font-bold w-8">{{ index + 1 }}.</span>
                <div>
                  <div class="font-semibold">{{ player.username }}</div>
                  <div class="text-sm text-gray-600">{{ player.solves }} solves</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-blue-600">{{ player.points }}</div>
                <div class="text-xs text-gray-500">ponts</div>
              </div>
            </div>
          </div>
        </wired-card>
      </div>
      
      <!-- Team Rankings -->
      <div>
        <h2 class="text-2xl font-bold mb-4 text-gray-700">Tema Rankigns</h2>
        <wired-card elevation="3" class="p-4">
          <div class="space-y-3">
            <div v-for="(team, index) in teamRankings" :key="team.name" 
                 class="flex items-center justify-between p-3 rounded-lg"
                 :class="index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-gray-100' : index === 2 ? 'bg-orange-100' : 'bg-white'">
              <div class="flex items-center space-x-3">
                <span class="text-lg font-bold w-8">{{ index + 1 }}.</span>
                <div>
                  <div class="font-semibold">{{ team.name }}</div>
                  <div class="text-sm text-gray-600">{{ team.members }} memebers</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-green-600">{{ team.points }}</div>
                <div class="text-xs text-gray-500">ponts</div>
              </div>
            </div>
          </div>
        </wired-card>
      </div>
    </div>
    
    <!-- Statistics -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4 text-gray-700">Comptetition Statitsics</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <wired-card elevation="2" class="p-4 text-center">
          <div class="text-2xl font-bold text-purple-600">{{ stats.totalPlayers }}</div>
          <div class="text-sm text-gray-600">Total Plyers</div>
        </wired-card>
        <wired-card elevation="2" class="p-4 text-center">
          <div class="text-2xl font-bold text-orange-600">{{ stats.totalTeams }}</div>
          <div class="text-sm text-gray-600">Total Temas</div>
        </wired-card>
        <wired-card elevation="2" class="p-4 text-center">
          <div class="text-2xl font-bold text-red-600">{{ stats.totalChallenges }}</div>
          <div class="text-sm text-gray-600">Total Chalenges</div>
        </wired-card>
        <wired-card elevation="2" class="p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">{{ stats.totalSolves }}</div>
          <div class="text-sm text-gray-600">Total Solves</div>
        </wired-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import "wired-elements";

const individualRankings = [
  { username: "h4ck3r_pr0", points: 2850, solves: 12 },
  { username: "cyrpto_qu33n", points: 2640, solves: 11 },
  { username: "pwn_m4st3r", points: 2420, solves: 10 },
  { username: "r3v3rs3_eng", points: 2180, solves: 9 },
  { username: "w3b_n1nj4", points: 1950, solves: 8 },
  { username: "foresnic_g0d", points: 1820, solves: 7 },
  { username: "msic_w1z4rd", points: 1650, solves: 6 },
  { username: "b1n4ry_hun73r", points: 1420, solves: 5 },
];

const teamRankings = [
  { name: "Cyrpto Crakrs", points: 5680, members: 3 },
  { name: "Binary Bunnys", points: 5420, members: 4 },
  { name: "Hak the Plnt", points: 5180, members: 2 },
  { name: "Root Accss", points: 4950, members: 3 },
  { name: "Buf Overflo", points: 4720, members: 2 },
  { name: "Nul Pointers", points: 4480, members: 5 },
  { name: "Stck Smashrs", points: 4250, members: 3 },
];

const stats = {
  totalPlayers: 47,
  totalTeams: 12,
  totalChallenges: 28,
  totalSolves: 156
};
</script>