<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Scoreboard</h1>
    
    <UTable
      :data="scoreboardData"
      :columns="columns"
      class="w-full"
    >
      <template #rank-cell="{ row }">
        <div class="flex items-center gap-2">
          <UBadge
            v-if="row.original.rank === 1"
            color="warning"
            variant="subtle"
            class="font-bold"
          >
            🥇
          </UBadge>
          <UBadge
            v-else-if="row.original.rank === 2"
            color="neutral"
            variant="subtle"
            class="font-bold"
          >
            🥈
          </UBadge>
          <UBadge
            v-else-if="row.original.rank === 3"
            color="primary"
            variant="subtle"
            class="font-bold"
          >
            🥉
          </UBadge>
          <span v-else class="font-semibold">{{ row.original.rank }}</span>
        </div>
      </template>

      <template #totalPoints-cell="{ row }">
        <span class="font-bold text-primary">{{ row.original.totalPoints }}</span>
      </template>

      <template #lastSolve-cell="{ row }">
        <span class="text-sm text-muted">{{ formatDate(row.original.lastSolve) }}</span>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~/utils/gql";
import type { TableColumn } from '@nuxt/ui';

const solvesQuery = graphql(`
  query getAllSolves {
    users {
      username
      actor
      solves {
        challenge {
          id
          name
          points
          solves
        }
        solvedAt
      }
    }
  }
`);

const { data: solvesInfo } = await useAsyncQuery(solvesQuery);

type ScoreboardEntry = {
  actor: string;
  username: string;
  totalPoints: number;
  solveCount: number;
  lastSolve: string | null;
  rank: number;
};

const scoreboardData = computed(() => {
  if (!solvesInfo.value) return [];

  const result: Record<string, Omit<ScoreboardEntry, 'rank'>> = {};
  
  for (const user of solvesInfo.value.users) {
    if (!result[user.actor]) {
      result[user.actor] = {
        actor: user.actor,
        username: user.username,
        totalPoints: 0,
        solveCount: 0,
        lastSolve: null,
      };
    }
    
    for (const solve of user.solves) {
      result[user.actor].totalPoints += solve.challenge.points;
      result[user.actor].solveCount += 1;
      
      if (!result[user.actor].lastSolve || solve.solvedAt > result[user.actor].lastSolve) {
        result[user.actor].lastSolve = solve.solvedAt;
      }
    }
  }
  
  const sorted = Object.values(result).sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (!a.lastSolve) return 1;
    if (!b.lastSolve) return -1;
    return new Date(a.lastSolve).getTime() - new Date(b.lastSolve).getTime();
  });

  // Assign ranks with proper tie handling
  let currentRank = 1;
  const withRanks: ScoreboardEntry[] = sorted.map((entry, index) => {
    if (index > 0 && entry.totalPoints < sorted[index - 1].totalPoints) {
      currentRank = index + 1;
    }
    return {
      ...entry,
      rank: currentRank
    };
  });

  return withRanks;
});

const columns: TableColumn<ScoreboardEntry>[] = [
  {
    id: 'rank',
    header: 'Rank',
    meta: {
      class: {
        th: 'w-20',
        td: 'w-20'
      }
    }
  },
  {
    accessorKey: 'username',
    header: 'Team',
    meta: {
      class: {
        td: 'font-medium'
      }
    }
  },
  {
    accessorKey: 'totalPoints',
    header: 'Points',
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right'
      }
    }
  },
  {
    accessorKey: 'solveCount',
    header: 'Solves',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    }
  },
  {
    accessorKey: 'lastSolve',
    header: 'Last Solve',
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right'
      }
    }
  }
];

function formatDate(dateString: string | null): string {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
}
</script>
