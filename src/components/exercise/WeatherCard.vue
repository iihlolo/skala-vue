<script setup>
// 1. 상위로부터 단방향 주입받을 객체 데이터 규격 검수 (매크로)
defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
  // 도시에 배정된 오늘의 야구 경기 정보 (없는 도시는 null)
  game: {
    type: Object,
    default: null,
  },
})

// 2. 상위로 송신할 두 가지 경로의 커스텀 이벤트 식별자 등록 (매크로)
const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <div class="weather-card" @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)">
    <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
    <p>현재 기온: {{ cityItem.temp }}°C</p>
    <p v-if="cityItem.humidity != null">습도 {{ cityItem.humidity }}% · 미세먼지 {{ cityItem.fineDust }} · 바람 {{ cityItem.wind }}m/s</p>

    <span v-if="cityItem.temp >= 25" class="badge hot">🔥 더움(25도 이상)</span>
    <span v-else class="badge cool">❄️ 선선함(25도 미만)</span>

    <span v-if="game" class="badge" :class="game.gameStatus === '우취' ? 'rainout' : 'scheduled'">⚾ {{ game.awayTeam }} vs {{ game.homeTeam }} · {{ game.gameStatus }}</span>

    <button class="btn-detail" @click.stop="emit('click-detail', cityItem.name, cityItem.status)">상세보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  background: #fff;
  border: 1px solid #dee2e6;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
}
.hot {
  background-color: #ff7675;
}
.cool {
  background-color: #74b9ff;
}
.scheduled {
  background-color: #1098ad;
}
.rainout {
  background-color: #8d2f2f;
}
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>
