<template>
  <div
    v-if="matches.length"
    class="container">
    <div class="left-arrow">
      <button @click="slideMatches(-3)">
        &larr;
      </button>
    </div>

    <div class="card-display">
      <transition-group
        :name="direction ? `slideOut` : `slideIn`"
        class="card-row"
        tag="div">
        <GameCard
          v-for="card in visibleMatches"
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
      </transition-group>
    </div>

    <div class="right-arrow">
      <button @click="slideMatches(3)">
        &rarr;
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import GameCard from './components/GameCard.vue'

export default {
  name: 'App',

  components: { GameCard },

  setup() {
    const direction = ref(true)
    const matches = ref({})
    const visibleIndeciesStart = ref(0)

    onMounted(() => {
      const lineData = new WebSocket('ws://localhost:8999')

      lineData.onopen = () => {
        lineData.send('startWebsocket')
      }

      lineData.onmessage = (event) => {
        matches.value = JSON.parse(event.data)
      }
    })

    return {
      direction,
      matches,
      slideMatches: (change) => {
        direction.value = change > 0
        visibleIndeciesStart.value = visibleIndeciesStart.value + change
      },
      visibleIndeciesStart,
      visibleMatches: computed(() => [
        matches.value[visibleIndeciesStart.value],
        matches.value[visibleIndeciesStart.value + 1],
        matches.value[visibleIndeciesStart.value + 2],
      ])
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
}

.left-arrow,
.right-arrow {
  display: grid;
  place-items: center;
}

.card-display {
  overflow: hidden;
  width: 964px;
}

.card-row {
  display: flex;
  padding: 16px;
}

.card-row > * {
  margin-right: 8px;
  margin-bottom: 8px;
}

.slideOut-enter-active,
.slideOut-leave-active,
.slideIn-enter-active,
.slideIn-leave-active {
  transition: all 300ms cubic-bezier(0.64, 0.6, 0.4, 1.04);
}

.slideOut-enter-from {
  transform: translateX(500px);
}

.slideOut-leave-to {
  transform: translateX(-500px);
}

.slideIn-enter-from {
  transform: translateX(-500px);
}

.slideIn-leave-to {
  transform: translateX(500px);
}
</style>
