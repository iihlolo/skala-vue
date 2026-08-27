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

const weatherIcons = {
  맑음: '☀️',
  비: '🌧️',
  흐림: '☁️',
  바람: '💨',
  눈: '❄️',
}
</script>

<template>
  <div class="weather-card"
  :class="{ 'rainout-card': game?.gameStatus === '우취' }"
  @click.stop="emit('select-card', `⚾️ ${cityItem.name}${cityItem.stadium}${cityItem.particle} 선택되었습니다.`)">
    <div class="card-top">
      <div class="name-block">
        <h4>{{ cityItem.name }}</h4>
      </div>
      <div class="status-block">
        <span class="status-icon" :aria-label="cityItem.status" role="img">
          {{ weatherIcons[cityItem.status] ?? '🌤️' }}
        </span>
        <!-- <span class="status-label">{{ cityItem.status }}</span> -->
      </div>
      <span class="temp">{{ cityItem.temp }}°C</span>
      <button class="btn-detail" @click.stop="emit('click-detail', cityItem.address, cityItem.status, cityItem.temp)">
        상세보기
      </button>
    </div>

    <p v-if="cityItem.humidity != null" class="meta-row">
      습도 {{ cityItem.humidity }}% · 미세먼지 {{ cityItem.fineDust }} · 바람 {{ cityItem.wind }}m/s
    </p>

    <div class="badge-row">
      <span v-if="cityItem.temp >= 25" class="badge hot">더움</span>
      <span v-else-if="cityItem.temp >= 20" class="badge warm">따뜻함</span>
      <span v-else-if="cityItem.temp < 10" class="badge cold">추움</span>
      <span v-else class="badge cool">선선함</span>

      <span
        v-if="game"
        class="badge"
        :class="game.gameStatus === '우취' ? 'rainout' : 'scheduled'"
      >
        {{ game.awayTeam }} vs {{ game.homeTeam }} {{ game.gameStatus }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  --border: #e7e9ee;
  --text-primary: #1c1f26;
  --text-secondary: #6b7280;

  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.weather-card:hover {
  border-color: #d3d7de;
  box-shadow: 0 4px 12px rgba(16, 24, 40, 0.06);
  transform: translateY(-1px);
}

.rainout-card {
  background: #efeff0 !important;
}

.card-top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto auto;
  align-items: center;
  column-gap: 8px;
  margin-bottom: 8px;
}

.name-block {
  min-width: 0;
}

.name-block h4 {
  margin: 0 0 2px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-label {
  font-size: 12.5px;
  color: var(--text-secondary);
}

.status-icon {
  font-size: clamp(20px, 2.5vw, 28px);
  line-height: 1;
}

.temp {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.meta-row {
  font-size: 12.5px;
  color: var(--text-secondary);
  margin: 0 0 12px;
  line-height: 1.5;
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.badge {
  display: inline-block;
  padding: 4px 9px;
  font-size: 11.5px;
  font-weight: 500;
  border-radius: 999px;
}

.hot {
  background: #fdecec;
  color: #c53d33;
}

.warm {
  background: #fff4e5;
  color: #c56f33;
}

.cool {
  background: #e0f7ff;
  color: #075f7c;
}

.cold {
  background: #eaf3ff;
  color: #2563c9;
}

.scheduled {
  background: #e6f7f6;
  color: #0f7d78;
}

.rainout {
  background: #d7d7d7;
  color: #6e6e6e;
}

.btn-detail {
  position: static;
  flex-shrink: 0;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.btn-detail:hover {
  background: #f6f7f9;
  border-color: #d3d7de;
}

@container (max-width: 300px) {
  .card-top {
    display: flex;
    flex-wrap: wrap;
    row-gap: 8px;
  }

  .name-block {
    flex: 1 1 0;
    order: 1;
  }

  .status-block {
    flex: 0 0 100%;
    order: 4;
    justify-self: start;
  }

  .temp {
    order: 2;
  }

  .btn-detail {
    order: 3;
  }

  .status-label {
    font-size: 12px;
  }
}
</style>