<template>
  <div class="selector-container">
    <p class="components-title">添加题目</p>
    <TransitionGroup name="slide" tag="div" class="selector-transition-group">
      <el-button
        v-for="(item, index) in supportedComponents.data"
        :key="item[0]"
        class="btn-selector"
        :icon="Plus"
        type="primary"
        plain
        @click="jump(index)"
      >
        {{ item[0] }}
      </el-button>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { QuestionnaireSupportType } from '../../../entity/enum/QuestionnaireSupportType.entity'
/**
 * 支持的题目
 */
const supportedComponents = reactive({
  data: [
    ['单项选择', QuestionnaireSupportType.RADIO],
    ['多项选择', QuestionnaireSupportType.CHECKBOX],
  ],
})

const emit = defineEmits(['chosen'])

function jump(index: number) {
  const type = supportedComponents.data[index]
  emit('chosen', supportedComponents.data[index][1])
  supportedComponents.data.splice(index, 1)
  window.setTimeout(() => {
    supportedComponents.data.push(type)
  }, 1500)
}
</script>

<style lang="scss" scoped>
@import '../style';

.selector-container {
  min-width: 180px;
  padding: 16px 8px;
  margin: 20px;
  background: #fff;
  border-radius: $q-border-radius-normal;
  box-shadow: $q-box-shadow-normal;
}

.selector-transition-group {
  transition: all;
  display: flex;
  flex-direction: column;
  align-items: center;
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
