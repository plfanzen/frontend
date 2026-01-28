<template>
  <div class="flex flex-col p-4">
    <UCheckbox v-model="hideSolved" label="Hide Solved Challenges" />
    <div v-if="categories.length === 0" class="mt-8 text-center text-gray-600">
      <span v-if="hideSolved && hasSolved"
        >All challenges solved! Congratulations!</span
      >
      <span v-else>No challenges available at the moment.</span>
    </div>
    <div v-for="category in categories" :key="category.id" class="mb-8">
      <h3 class="text-2xl font-bold mb-4" :style="{ color: category.color }">
        {{ category.name }}
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        <Challenge
          v-for="challenge in category.challenges"
          :challengeId="challenge.id"
          :key="challenge.id"
          :title="challenge.name"
          :points="challenge.points"
          :backgroundColor="category.color"
          :description="challenge.descriptionMd"
          :difficulty="difficultiesMap[challenge.difficulty]?.name"
          :difficultyColor="difficultiesMap[challenge.difficulty]?.color"
          :instanceInfo="challenge.instance"
          :solves="challenge.solves"
          :solved="challenge.solved"
          :attachments="challenge.attachments"
          :canExport="challenge.canExport"
          :canStart="challenge.canStart"
          class="max-w-sm h-full"
          @launch="refresh"
          @stop="refresh"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";

const hideSolved = ref(false);

const challsInfoQuery = graphql(`
  query getChallengesInfo {
    challenges {
      id
      name
      authors
      descriptionMd
      points
      categories
      difficulty
      solved
      solves
      canExport
      canStart
      attachments
      instance {
        state
        connectionInfo {
          port
          host
          protocol
          sshUsername
          sshPassword
        }
      }
    }
    eventConfig {
      categories {
        name
        id
        color
        description
      }
      difficulties {
        name
        id
        color
      }
    }
  }
`);

const { data: challsInfo, refresh } = await useAsyncQuery(challsInfoQuery);

const shownChallenges = computed(() => {
  if (!challsInfo.value) return [];

  if (hideSolved.value) {
    return challsInfo.value.challenges.filter(
      (challenge: any) => !challenge.solved,
    );
  }
  return challsInfo.value.challenges;
});

const hasSolved = computed(() => {
  if (!challsInfo.value) return false;

  return challsInfo.value.challenges.some((challenge: any) => challenge.solved);
});

const categories = computed(() => {
  if (!shownChallenges.value || !challsInfo.value) return [];

  const challengesByCategory: Record<string, any[]> = {};
  shownChallenges.value.forEach((challenge: any) => {
    challenge.categories.forEach((categoryId: string) => {
      if (!challengesByCategory[categoryId]) {
        challengesByCategory[categoryId] = [];
      }
      challengesByCategory[categoryId].push(challenge);
    });
  });

  return challsInfo.value.eventConfig.categories
    .filter((cat: any) => (challengesByCategory[cat.id]?.length || 0) > 0)
    .map((cat: any) => ({
      ...cat,
      challenges:
        challengesByCategory[cat.id]?.toSorted((a, b) =>
          a.points !== b.points
            ? b.points - a.points
            : a.name.localeCompare(b.name),
        ) || [],
    }))
    .toSorted((a, b) => a.name.localeCompare(b.name));
});

const interval = ref<null | number>(null);
onMounted(() => {
  interval.value = window.setInterval(() => {
    refresh();
  }, 5000);
});

onBeforeUnmount(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
});

const difficultiesMap = computed(() => {
  const map: Record<string, { name: string; color: string }> = {};
  challsInfo.value?.eventConfig.difficulties.forEach((diff: any) => {
    map[diff.id] = { name: diff.name, color: diff.color };
  });
  return map;
});
</script>
