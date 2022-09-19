<template>
  <div class="selector-container">
    <p class="components-title">
      添加题目
    </p>
    <el-button
      v-for="item in supportedComponents"
      :key="item.label"
      class="btn-selector"
      :icon="Plus"
      type="primary"
      plain
      @click="$emit('chosen', item.type)"
    >
      {{ item.label }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { reactive } from 'vue'
/**
 * 支持的题目
 */
const supportedComponents = reactive([
  { label: '单项选择', type: 'radio' },
  { label: '多项选择', type: 'checkbox' }
])

defineEmits(['chosen'])
</script>

<style lang="scss" scoped>
@import "../style";

.selector-container {
  min-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: $q-border-radius-normal;
  margin: 20px;
  padding: 16px 8px;
  background: #fff;
  box-shadow: $q-box-shadow-normal;
  transition: all;
}

.components-title {
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 26px;
}

.btn-selector {
  margin: 4px;
}
</style>
