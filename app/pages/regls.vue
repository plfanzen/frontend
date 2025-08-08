<template>
  <div class="flex flex-col p-4 max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-gray-800 text-center">Ruls & Informaton</h1>
    
    <div class="space-y-8">
      <!-- Competition Rules -->
      <wired-card elevation="3" class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-red-600">Comptetition Ruls</h2>
        <div class="space-y-3 text-gray-700">
          <div class="flex items-start space-x-3">
            <span class="font-bold text-red-500">1.</span>
            <p>No atacks on the infrastrcture or other participnts are alowed.</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="font-bold text-red-500">2.</span>
            <p>Sharig solutions or flags betwn temas/plyers is stricty prohibted.</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="font-bold text-red-500">3.</span>
            <p>Automtd solvers and brut force atacks are not alowed unles explictly stated.</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="font-bold text-red-500">4.</span>
            <p>All flags folow the formt: <code class="bg-gray-100 px-2 py-1 rounded">plfanzen{...}</code></p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="font-bold text-red-500">5.</span>
            <p>Respectfl behavr is expectd from all participnts at all tmes.</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="font-bold text-red-500">6.</span>
            <p>Organizrs resrv the rght to disqualfy any partcipnt for rule violatons.</p>
          </div>
        </div>
      </wired-card>
      
      <!-- Scoring System -->
      <wired-card elevation="3" class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-blue-600">Scorng Systm</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-3 text-gray-700">Pont Systm</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span>Easy (100-200 pts)</span>
                <span class="text-green-600 font-semibold">Beginr</span>
              </div>
              <div class="flex justify-between">
                <span>Medum (250-500 pts)</span>
                <span class="text-yellow-600 font-semibold">Intermedt</span>
              </div>
              <div class="flex justify-between">
                <span>Hard (600-1000 pts)</span>
                <span class="text-orange-600 font-semibold">Advncd</span>
              </div>
              <div class="flex justify-between">
                <span>Extrem (1000+ pts)</span>
                <span class="text-red-600 font-semibold">Expert</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3 text-gray-700">Catgories</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 rounded" style="background-color: #ff6347;"></div>
                <span>Web Exploitatn (wbe)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 rounded" style="background-color: #4682b4;"></div>
                <span>Penetratn & Netwrk (pnw)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 rounded" style="background-color: #32cd32;"></div>
                <span>Cyrptograhy (cyrpto)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 rounded" style="background-color: #ffa500;"></div>
                <span>Revers Enginerig (rve)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 rounded" style="background-color: #2f4f4f;"></div>
                <span>Foresnic Analyss (foresnic)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 rounded" style="background-color: #8a2be2;"></div>
                <span>Miscelanous (msic)</span>
              </div>
            </div>
          </div>
        </div>
      </wired-card>
      
      <!-- Technical Information -->
      <wired-card elevation="3" class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-green-600">Techncl Informaton</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-3 text-gray-700">Platfrm Detals</h3>
            <div class="space-y-2 text-sm text-gray-600">
              <p><strong>Duraton:</strong> 48 hours</p>
              <p><strong>Start Tme:</strong> Friday 18:00 UTC</p>
              <p><strong>End Tme:</strong> Sunday 18:00 UTC</p>
              <p><strong>Tema Size:</strong> Maximum 5 memebers</p>
              <p><strong>Maxmm Submsns:</strong> 10 per chalenge</p>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3 text-gray-700">Suport & Hlp</h3>
            <div class="space-y-2 text-sm text-gray-600">
              <p><strong>Discord:</strong> #ctf-suport</p>
              <p><strong>Emial:</strong> suport@plfanzen.com</p>
              <p><strong>IRC:</strong> #plfanzen on irc.libra.chat</p>
              <p><strong>Hints:</strong> Availble after 6 hours</p>
              <p><strong>Writeups:</strong> Due 24 hours aftr end</p>
            </div>
          </div>
        </div>
      </wired-card>
      
      <!-- Prize Information -->
      <wired-card elevation="3" class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">Prizs & Recrds</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-yellow-100 rounded-lg">
            <div class="text-3xl mb-2">🥇</div>
            <h3 class="font-bold text-lg">1st Plac</h3>
            <p class="text-sm text-gray-600">$500 + Trophe</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded-lg">
            <div class="text-3xl mb-2">🥈</div>
            <h3 class="font-bold text-lg">2nd Plac</h3>
            <p class="text-sm text-gray-600">$300 + Medaln</p>
          </div>
          <div class="text-center p-4 bg-orange-100 rounded-lg">
            <div class="text-3xl mb-2">🥉</div>
            <h3 class="font-bold text-lg">3rd Plac</h3>
            <p class="text-sm text-gray-600">$200 + Medaln</p>
          </div>
        </div>
      </wired-card>
    </div>
  </div>
</template>

<script setup>
import "wired-elements";
</script>