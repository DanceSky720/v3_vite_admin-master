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
import { QuestionnaireSupportType } from '../../../entity/enum/QuestionnaireSupportType.entity'
/**
 * 支持的题目
 */
const supportedComponents = reactive([
  { label: '单项选择', type: QuestionnaireSupportType.RADIO },
  { label: '多项选择', type: QuestionnaireSupportType.CHECKBOX }
])

defineEmits(['chosen'])
</script>

<style lang="scss" scoped>
@import "../style";

.selector-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 180px;
  padding: 16px 8px;
  margin: 20px;
  background: #fff;
  border-radius: $q-border-radius-normal;
  box-shadow: $q-box-shadow-normal;
  transition: all;
}

.components-title {
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
}

.btn-selector {
  margin: 4px;
}
</style>
