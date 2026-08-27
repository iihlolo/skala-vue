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
    <h3>오늘의 야구 경기</h3>
    <div v-for="game in games" :key="game.city" class="game-row">
      <strong>{{ game.city }}</strong>
      <span>{{ game.awayTeam }} vs {{ game.homeTeam }}</span>
      <b :class="game.gameStatus === '우취' ? 'cancelled' : 'scheduled'">{{ game.gameStatus }}</b>
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
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
}

.game-row {
  display: grid;
  grid-template-columns: 52px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.game-row strong {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.game-row span {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.7);
}

.game-row b {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 500;
  justify-self: end;
}

.scheduled {
  color: #023141;
  background: rgba(168, 216, 232, 1.0);
}

.cancelled {
  color: #710f0f;
  background: rgba(245, 168, 168, 1.0);
}
</style>