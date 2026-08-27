<script setup>
// 1. 상위로 입력 텍스트를 전달할 커스텀 이벤트 등록 (매크로)
const emit = defineEmits(['update-query'])

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
    <h3>도시 검색</h3>
    <input
      type="text"
      :value="currentQuery"
      class="search-input"
      placeholder="검색할 도시 이름 입력"
      @input="emit('update-query', $event.target.value)"
    />
    <p>
      검색 중인 도시:
      <el-tag v-if="currentQuery" effect="plain">{{ currentQuery }}</el-tag>
      <strong v-else>전체</strong>
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

.search-input {
  grid-column: 2;
  grid-row: 1;
  box-sizing: border-box;
  min-height: 32px;
  padding: 7px 11px;
  width: 100%;
  color: #606266;
  font-size: 14px;
  line-height: 1.4;
  background-color: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 1px rgba(64, 158, 255, 0.18);
}

@media (max-width: 620px) {
  .search-inner {
    grid-template-columns: 1fr;
    justify-content: stretch;
  }

  .search-inner h3,
  .search-inner p,
  .search-input {
    grid-column: 1;
  }

  .search-input {
    grid-row: 2;
  }

  .search-inner p {
    grid-row: 3;
  }
}
</style>
