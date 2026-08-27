<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

// 1. 상위로부터 단방향 주입받을 객체 데이터 규격 검수 (매크로)
const props = defineProps({
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

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp // 기본 원본 데이터는 섭씨 숫자
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환 연산
  }
  return rawTemp // 'celsius'일 때는 원본 그대로 반환
})

const temperatureTag = computed(() => {
  if (props.cityItem.temp >= 25) return { type: 'danger', label: '더움' }
  if (props.cityItem.temp >= 20) return { type: 'warning', label: '따뜻함' }
  if (props.cityItem.temp < 10) return { type: 'primary', label: '추움' }
  return { type: 'success', label: '선선함' }
})

const weatherIcons = {
  맑음: '☀️',
  비: '🌧️',
  흐림: '☁️',
  바람: '💨',
  눈: '❄️',
}
</script>

<template>
  <el-card
    class="weather-card"
    :class="{ 'rainout-card': game?.gameStatus === '우취' }"
    shadow="hover"
    @click.stop="emit('select-card', `⚾️ ${cityItem.name}${cityItem.stadium}${cityItem.particle} 선택되었습니다.`)"
  >
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
      <span class="temp">{{ displayTemp }}{{ configStore.unitSymbol }}</span>
      <el-button class="btn-detail" size="small" round @click.stop="emit('click-detail', cityItem.address, cityItem.status, cityItem.temp)">
        상세보기
      </el-button>
    </div>

    <p v-if="cityItem.humidity != null" class="meta-row">
      습도 {{ cityItem.humidity }}% · 미세먼지 {{ cityItem.fineDust }} · 바람 {{ cityItem.wind }}m/s
    </p>

    <div class="badge-row">
      <el-tag :type="temperatureTag.type" effect="light" round>{{ temperatureTag.label }}</el-tag>

      <el-tag
        v-if="game"
        :type="game.gameStatus === '우취' ? 'info' : 'success'"
        effect="light"
        round
      >
        {{ game.awayTeam }} vs {{ game.homeTeam }} {{ game.gameStatus }}
      </el-tag>
    </div>
  </el-card>
</template>

<style scoped>
.weather-card {
  --border: #e7e9ee;
  --text-primary: #1c1f26;
  --text-secondary: #6b7280;

  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.weather-card :deep(.el-card__body) {
  padding: 10px 12px;
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
  column-gap: 6px;
  margin-bottom: 6px;
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
  margin: 0 0 8px;
  line-height: 1.35;
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.btn-detail {
  position: static;
  flex-shrink: 0;
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