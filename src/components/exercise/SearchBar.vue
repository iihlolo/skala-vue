<script setup>
// 1. 상위로 입력 텍스트를 전달할 커스텀 이벤트 등록 (매크로)
defineEmits(['update-query'])

// 2. 상위로부터 현재 검색 상태 값을 수신 (한글 동기화 상태 유지용)
defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="search-inner">
    <h3>🔍 도시 검색</h3>
    <input type="text" :value="currentQuery" @input="$emit('update-query', $event.target.value)" placeholder="검색할 도시 이름 입력" />
    <p>
      검색 중인 도시: <strong>{{ currentQuery }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-inner {
  display: grid;
  grid-template-columns: auto minmax(0, 45%);
  grid-template-rows: auto auto;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.search-inner h3 {
  grid-column: 1;
  grid-row: 1;
  margin: 0;
}

.search-inner p {
  grid-column: 1;
  grid-row: 2;
  margin: 0;
  text-align: center;
}

.search-inner input {
  grid-column: 2;
  grid-row: 1;
  padding: 8px;
  width: 100%;
  font-size: 14px;
}
</style>
