<script setup>
import { computed, onMounted } from 'vue'
import { baseballGames } from '../data/baseballData'
import { useWeatherStore } from '@/stores/weatherStore'

const weatherStore = useWeatherStore()

onMounted(() => weatherStore.fetchWeather())

const games = computed(() =>
  baseballGames.map((game) => {
    const weather = weatherStore.weatherList.find((item) => item.name === game.city)
    return { ...game, stadium: weather?.stadium, gameStatus: weather?.status === '비' ? '우취' : '경기' }
  }),
)
</script>

<template>
  <section class="schedule-page">
    <div class="page-heading">
      <p>GAME SCHEDULE</p>
      <h1>오늘의 야구 경기</h1>
    </div>
    <div class="game-grid">
      <article v-for="game in games" :key="game.city" class="game-card" :class="{ cancelled: game.gameStatus === '우취' }">
        <div class="game-card-top">
          <strong>{{ game.city }} {{ game.stadium }}</strong>
          <span>{{ game.gameStatus }}</span>
        </div>
        <div class="matchup">
          <span>{{ game.awaySP }}</span>
          <strong><img :src="game.awayIcon" alt="" />{{ game.awayTeam }} vs {{ game.homeTeam }}<img :src="game.homeIcon" alt="" /></strong>
          <span>{{ game.homeSP }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.schedule-page { padding: 40px 20px; }
.page-heading { margin-bottom: 20px; }
.page-heading p { margin: 0; color: #3b6ef6; font-size: 13px; font-weight: 700; }
.page-heading h1 { margin: 6px 0 0; font-size: 26px; }
.game-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; }
.game-card { padding: 18px; background: #ffffff; border: 1px solid #e7e9ee; border-radius: 8px; }
.game-card.cancelled { background: #f3f4f6; color: #6b7280; }
.game-card-top, .matchup { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.game-card-top span { padding: 4px 8px; color: #075f7c; background: #e0f7ff; border-radius: 999px; font-size: 12px; font-weight: 700; }
.cancelled .game-card-top span { color: #6b7280; background: #d1d5db; }
.matchup { margin-top: 22px; font-size: 13px; color: #4b5563; }
.matchup strong { display: flex; align-items: center; gap: 5px; color: #1c1f26; white-space: nowrap; }
.matchup img { width: 26px; height: 26px; object-fit: contain; }
</style>

<style>
.app-shell.dark-mode .page-heading h1 {
  color: #f6f7f9;
}
</style>