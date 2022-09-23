<template>
  <div class="selector-container">
    <p class="components-title">
      添加题目
    </p>
    <TransitionGroup
      name="slide"
      tag="div"
      class="selector-transition-group"
    >
      <el-button
        v-for="(item, index) in supportedComponents.data"
        :key="item[0]"
        draggable="true"
        class="btn-selector"
        :icon="Rank"
        type="primary"
        plain
        size="large"
        @dragstart="dancer = item[1]"
        @dragend="submit(index, false)"
        @click="submit(index, true)"
      >
        {{ item[0] }}
      </el-button>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { QuestionnaireSupportType } from '../../../entity/enum/QuestionnaireSupportType.entity'
import { Rank } from '@element-plus/icons-vue'
import { reactive, ref, watch } from 'vue'
const props = defineProps({
  /**
   * 类型
   */
  modelValue: {
    type: String,
    default: null
  }
})
/**
 * 支持的题目
 */
const supportedComponents = reactive({
  data: [
    ['单项选择', QuestionnaireSupportType.RADIO],
    ['多项选择', QuestionnaireSupportType.CHECKBOX]
  ]
})
/**
 * 拖拽的题目类型
 */
const dancer = ref('')
const emit = defineEmits(['chosen', 'update:modelValue'])

watch(() => props.modelValue, (newValue) => {
  dancer.value = newValue
}
)
watch(dancer, (newValue) => {
  emit('update:modelValue', newValue)
})

/**
 * 提交选择事件
 * @param index 选中的下标
 * @param submit 是否提交事件
 */
function submit(index: number, submit: boolean) {
  const type = supportedComponents.data[index]
  if (submit) {
    emit('chosen', type[1])
  }
  supportedComponents.data.splice(index, 1)
  window.setTimeout(() => {
    supportedComponents.data.push(type)
  }, 1500)
}
</script>

<style lang="scss" scoped>
@import "../style";

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
