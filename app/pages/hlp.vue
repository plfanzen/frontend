<template>
  <div class="flex flex-col p-4 max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-gray-800 text-center">Hlp & FAQ</h1>
    
    <div class="space-y-6">
      <!-- Search Box -->
      <div class="mb-8">
        <wired-input 
          placeholder="Serch for hlp..."
          class="w-full"
          v-model="searchQuery"
        />
      </div>
      
      <!-- FAQ Sections -->
      <div class="space-y-4">
        <div v-for="(section, sectionIndex) in filteredFAQ" :key="sectionIndex">
          <h2 class="text-2xl font-bold mb-4" :style="{ color: section.color }">
            {{ section.title }}
          </h2>
          
          <div class="space-y-3">
            <wired-card 
              v-for="(faq, faqIndex) in section.questions" 
              :key="faqIndex"
              elevation="2" 
              class="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              @click="toggleQuestion(sectionIndex, faqIndex)"
            >
              <div class="flex justify-between items-center">
                <h3 class="font-semibold text-lg">{{ faq.question }}</h3>
                <span class="text-xl">{{ faq.isOpen ? '−' : '+' }}</span>
              </div>
              <div v-if="faq.isOpen" class="mt-3 text-gray-600" v-html="faq.answer"></div>
            </wired-card>
          </div>
        </div>
      </div>
      
      <!-- Quick Links -->
      <wired-card elevation="3" class="p-6 mt-8">
        <h2 class="text-2xl font-bold mb-4 text-blue-600">Quik Links</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink to="/regls" class="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-center">
            <div class="text-2xl mb-2">📋</div>
            <div class="font-semibold">Ruls</div>
          </NuxtLink>
          <NuxtLink to="/puntkebertt" class="block p-3 bg-green-50 rounded-lg hover:bg-green-100 text-center">
            <div class="text-2xl mb-2">🏆</div>
            <div class="font-semibold">Scorebord</div>
          </NuxtLink>
          <NuxtLink to="/profil" class="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 text-center">
            <div class="text-2xl mb-2">👤</div>
            <div class="font-semibold">Profil</div>
          </NuxtLink>
          <a href="mailto:suport@plfanzen.com" class="block p-3 bg-red-50 rounded-lg hover:bg-red-100 text-center">
            <div class="text-2xl mb-2">📧</div>
            <div class="font-semibold">Conct</div>
          </a>
        </div>
      </wired-card>
    </div>
  </div>
</template>

<script setup>
import "wired-elements";
import { ref, computed } from "vue";

const searchQuery = ref("");

const faqData = [
  {
    title: "Getng Startd",
    color: "#4CAF50",
    questions: [
      {
        question: "How do I regisr for the comptettion?",
        answer: "Click on the 'Hautpeingang' link in the navigaton, then select 'Regisr Hre' to crate a new acont.",
        isOpen: false
      },
      {
        question: "Wht is the flag formt?",
        answer: "All flags folow the formt <code>plfanzen{flag_conten_hre}</code>. Make sur to includ the curly bracs!",
        isOpen: false
      },
      {
        question: "How do I joi a tema?",
        answer: "You can specifiy a tema name durng regitratn, or udate it latr in your profil setings.",
        isOpen: false
      }
    ]
  },
  {
    title: "Techncl Hlp",
    color: "#2196F3",
    questions: [
      {
        question: "I can't submt my flag, wht's wrong?",
        answer: "Mak sur you're copng the flag exctly as you fond it, inclding the <code>plfanzen{}</code> wrppers. Chek for extr spacs or hiddn chrcters.",
        isOpen: false
      },
      {
        question: "Hw do I conct to SSH/remote servcs?",
        answer: "Us your favrit SSH clint (Puty on Windws, Termnal on Mac/Linx). Credetls wil b provded in the chalenge descriptn.",
        isOpen: false
      },
      {
        question: "Wht tools shld I us?",
        answer: "Comn CTF tools includ: Burp Suit, Wireshark, Ghidra, John the Ripr, Hashcat, Nmap, and mor. Choos basd on the catgory.",
        isOpen: false
      }
    ]
  },
  {
    title: "Scorng & Rankng",
    color: "#FF9800",
    questions: [
      {
        question: "How ar ponts calctd?",
        answer: "Each chalenge hs a fixd pont valu basd on its difclty. Erly solvers don't gt bonos ponts.",
        isOpen: false
      },
      {
        question: "Whn ar scorebords updatd?",
        answer: "Scorebords ar updatd in rel-tme. You shld se your pont incres imediatly aftr a sucesfl submisn.",
        isOpen: false
      },
      {
        question: "Wht hapns if ther's a ti?",
        answer: "Tis ar brokn by th tme of th lst sucesfl submisn. Erlier submisns rank highr.",
        isOpen: false
      }
    ]
  },
  {
    title: "Comn Isus",
    color: "#f44336",
    questions: [
      {
        question: "I forgotd my passwrod",
        answer: "Us th 'Forgotd passwrod?' link on th login pag to rst your passwrod via emial.",
        isOpen: false
      },
      {
        question: "Th webst is loadng slowly",
        answer: "Try refeshng th pag or claring your browsr cach. If problms perst, conct suport.",
        isOpen: false
      },
      {
        question: "I'm stuk on a chalenge",
        answer: "Try difrent aproachs, red th descriptn carefuly, and don't hesitt to ask for hints in th Discord chanl aftr 6 hours.",
        isOpen: false
      }
    ]
  }
];

const faq = ref(faqData);

const filteredFAQ = computed(() => {
  if (!searchQuery.value.trim()) {
    return faq.value;
  }
  
  return faq.value.map(section => ({
    ...section,
    questions: section.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);
});

const toggleQuestion = (sectionIndex, questionIndex) => {
  faq.value[sectionIndex].questions[questionIndex].isOpen = 
    !faq.value[sectionIndex].questions[questionIndex].isOpen;
};
</script>