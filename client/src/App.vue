<template>
  <div class="card-row">
    <GameCard
      v-for="card in matches"
      :key="card.id">
      <template #teams>
        {{ card.teams.home }} - {{ card.teams.away }}
      </template>

      <template #date>
        {{ card.dateString }}
      </template>

      <template #home>
        {{ card.teams.home }}
      </template>

      <template #home-action>
        <button>
          {{ card.homeLine }}
        </button>
      </template>

      <template #money-action>
        <button>
          {{ card.moneyLine }}
        </button>
      </template>

      <template #away>
        {{ card.teams.away }}
      </template>

      <template #away-action>
        <button>
          {{ card.awayLine }}
        </button>
      </template>
    </GameCard>
  </div>  
</template>

<script>
import { onMounted, ref } from 'vue'
import GameCard from './components/GameCard.vue'

export default {
  name: 'App',

  components: { GameCard },

  setup() {
    const matches = ref({})

    onMounted(() => {
      const lineData = new WebSocket('ws://localhost:8999')

      lineData.onopen = () => {
        lineData.send('test')
      }

      lineData.onmessage = (event) => {
        matches.value = JSON.parse(event.data)
      }
    })

    return {
      matches
    }
  }
}
</script>

<style scoped>
.card-row {
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
}

.card-row > * {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
