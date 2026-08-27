<script setup>
// [본인 Mockup 추가분 분리] 오늘의 야구 경기 일정을 전담하는 카드 컴포넌트
defineProps({
  games: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="mockup-box">
    <h3><img src="/h1_logo.png" alt="" class="title-icon" /> 오늘의 야구 경기</h3>
    <div class="game-grid">
      <article
        v-for="game in games"
        :key="game.city"
        class="game-card"
        :class="{ 'cancelled-card': game.gameStatus === '우취' }"
      >
        <div class="game-card-top">
          <strong>{{ game.city }}{{ game.stadium }}</strong>
          <b :class="game.gameStatus === '우취' ? 'cancelled' : 'scheduled'">{{ game.gameStatus }}</b>
        </div>
        <div class="game-matchup">
          <span class="starting-pitcher">{{ game.awaySP }}</span>
          <strong><img :src="game.awayIcon" alt="" class="team-icon">{{ game.awayTeam }} vs {{ game.homeTeam }}<img :src="game.homeIcon" alt="" class="team-icon"></strong>
          <span class="starting-pitcher">{{ game.homeSP }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.mockup-box {
  padding: 20px;
  margin-bottom: 15px;
  color: #ffffff;
  background: #1e2a4a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(16, 24, 40, 0.12);
}

.mockup-box h3 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}

.title-icon {
  width: 60px;
  object-fit: contain;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.game-card {
  display: grid;
  gap: 12px;
  min-width: 0;
  padding: 16px;
  text-align: center;
  color: #1c1f26;
  background: hsl(47, 100%, 95%);
  border: 1px solid #e7e9ee;
  border-radius: 14px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08);
}

.cancelled-card {
  background: #e5e7eb;
  border-color: #d1d5db;
  box-shadow: none;
}

.cancelled-card strong,
.cancelled-card .game-card-top strong {
  color: #6b7280;
}

.game-card-top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 0;
}

.game-card strong {
  min-width: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1c1f26;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.game-matchup {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 6px;
  min-width: 0;
}

.game-matchup strong {
  color: #111827;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
}

.team-icon {
  width: 29px;
  height: 29px;
  object-fit: contain;
  vertical-align: middle;
}

.starting-pitcher {
  font-size: 13.5px;
  color: #4b5563;
  font-weight: 400;
  white-space: nowrap;
}

.game-card b {
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 500;
}

.scheduled {
  color: #023141;
  background: rgba(168, 216, 232, 1.0);
}

.cancelled {
  color: #6b7280;
  background: #d1d5db;
}
</style>