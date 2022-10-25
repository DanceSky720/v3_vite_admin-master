<template>
  <div class="selector-container">
    <TransitionGroup
      name="slide"
      tag="div"
      class="selector-transition-group"
    >
      <el-button
        v-for="(item, index) in data.supportedComponents"
        :key="item[0]"
        draggable="true"
        class="btn-selector"
        :icon="Rank"
        type="primary"
        plain
        size="large"
        @dragstart="data.dancer = item[1]"
        @dragend="submit(index, false)"
        @click="submit(index, true)"
      >
        {{ item[0] }}
      </el-button>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { QuestionnaireSupportType } from '@/entity/enum/QuestionnaireSupportType.entity'
import { Rank } from '@element-plus/icons-vue'
import { reactive, watch } from 'vue'
const props = defineProps({
  /**
   * 选中的类型
   */
  modelValue: {
    type: String,
    default: null
  }
})

const data: TopicSelectorData = reactive({
  supportedComponents: [
    ['单选题', QuestionnaireSupportType.RADIO],
    ['多选题', QuestionnaireSupportType.CHECKBOX],
    ['填空题', QuestionnaireSupportType.INPUT]
  ],
  dancer: ''
})
const emit = defineEmits(['chosen', 'update:modelValue'])

watch(() => props.modelValue,
  (newValue) => {
    data.dancer = newValue
  }
)
watch(() => data.dancer,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

/**
 * 提交选择事件
 * @param index 选中的下标
 * @param submit 是否提交事件
 */
function submit(index: number, submit: boolean) {
  const type = data.supportedComponents[index]
  if (submit) {
    emit('chosen', type[1])
  }
  data.supportedComponents.splice(index, 1)
  window.setTimeout(() => {
    data.supportedComponents.push(type)
  }, 1500)
}
</script>

<style lang="scss" scoped>
@import "../../style";

.selector-container {
  min-width: 380px;
  max-width: 460px;
  padding: 16px 8px;
  margin: 10px;
  background: #fff;
  border-radius: $q-border-radius-normal;
  box-shadow: $q-box-shadow-normal;
}

.selector-transition-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  transition: all;
}

.btn-selector {
  margin: 4px;
}
</style>
