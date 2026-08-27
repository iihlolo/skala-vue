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
  padding: 18px;
  margin-bottom: 15px;
  color: #ffffff;
  background: linear-gradient(135deg, #087f8c, #1098ad);
  border-radius: 8px;
  box-shadow: 0 6px 14px rgba(8, 127, 140, 0.2);
}

.mockup-box h3 {
  margin-top: 0;
}

.game-row {
  display: grid;
  grid-template-columns: 52px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.28);
}

.game-row b {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.scheduled {
  color: #087f8c;
  background: #ffffff;
}

.cancelled {
  color: #8d2f2f;
  background: #ffd6d6;
}
</style>
