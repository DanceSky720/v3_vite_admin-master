<template>
  <div class="edit-container">
    <div class="edit-area">
      <el-form>
        <el-form-item
          label="题目"
          size="large"
        >
          <el-input
            v-model="questionnaireSubject.data.title"
            size="large"
            placeholder="为题目添加标题"
          />
        </el-form-item>
      </el-form>
      <el-divider> <h2>选项</h2> </el-divider>
      <el-button
        v-if="selective"
        class="add-btn"
        type="primary"
        :disabled="!allow"
        :icon="Plus"
        plain
        @click="addOption"
      >
        添加新选项
      </el-button>
      <el-form>
        <TransitionGroup
          name="bounce"
          tag="div"
          class="transition-group"
        >
          <div
            v-for="(option, index) in questionnaireSubject.data.options"
            :key="index"
            class="row"
          >
            <el-divider content-position="left">
              <h3>选项{{ index + 1 }}</h3>
            </el-divider>
            <el-form-item class="action-right">
              <el-button
                :icon="ArrowUpBold"
                circle
                plain
                @click="upwards(index)"
              />
              <el-button
                :icon="ArrowDownBold"
                circle
                plain
                @click="downward(index)"
              />
              <el-button
                type="danger"
                :icon="Delete"
                circle
                plain
                @click="remove(index)"
              />
            </el-form-item>
            <el-form-item label="标题">
              <el-input
                v-model="option.title"
                placeholder="为题目添加标题"
              />
            </el-form-item>
            <el-form-item label="分数">
              <el-input
                v-model="option.fraction"
                class="col"
                type="number"
                placeholder="请输入分数"
              />
            </el-form-item>
            <el-form-item label="说明">
              <el-input
                v-model="option.explain"
                class="col"
                placeholder="请输入说明"
              />
            </el-form-item>
          </div>
        </TransitionGroup>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Delete,
  ArrowUpBold,
  ArrowDownBold,
  Plus
} from '@element-plus/icons-vue'
import { computed, PropType, reactive, watch } from 'vue'
import util from '../../../../../components/QuestionnaireManager/util'
import { QuestionnaireSupportType } from '../../../../../entity/enum/QuestionnaireSupportType.entity'

const props = defineProps({
  /**
   * 题目
   */
  modelValue: {
    type: Object as PropType<QuestionnaireSubject>,
    default: null
  }
})

/**
 * 题目
 */
const questionnaireSubject = reactive({
  data: {} as QuestionnaireSubject
})
// TODO 为没有唯一值的options寻找唯一值
/**
 * 是否是选择型
 */
const selective = computed(() => {
  if(!questionnaireSubject){
    return false
  }
  return (
    questionnaireSubject.data.type === QuestionnaireSupportType.CHECKBOX ||
    questionnaireSubject.data.type === QuestionnaireSupportType.RADIO
  )
})

const emit = defineEmits(['update:modelValue'])

/**
 * 是否允许添加新的选项
 */
const allow = computed(() => {
  const hasTitle = questionnaireSubject.data.options.every(
    (option: SubjectOption) => option.title !== ''
  )
  const checkArray: Array<boolean> = [
    hasTitle,
    questionnaireSubject.data.options.length < 4
  ]
  return checkArray.every((pass: boolean) => pass)
})

watch(
  () => props.modelValue,
  (modelValue) => {
    questionnaireSubject.data = modelValue
  },
  { immediate: true }
)

watch(questionnaireSubject.data, (newValue) => {
  emit('update:modelValue', newValue)
})

/**
 * 上移选项
 * @param index 要上移的元素下标
 */
function upwards(index: number) {
  questionnaireSubject.data.options = util.upwards<SubjectOption>(
    questionnaireSubject.data.options,
    index
  )
}

/**
 * 下移选项
 * @param index 要下移的元素下标
 */
function downward(index: number) {
  questionnaireSubject.data.options = util.downward<SubjectOption>(
    questionnaireSubject.data.options,
    index
  )
}

/**
 * 添加选项
 */
function addOption() {
  questionnaireSubject.data.options.push({
    title: '',
    serialNumber: undefined,
    explain: undefined,
    fraction: undefined
  })
}

/**
 * 移除选项
 * @param index 要移除的元素下标
 */
function remove(index: number) {
  questionnaireSubject.data.options.splice(index, 1)
}
</script>

<style lang="scss" scoped>
@import "../../../../../components/QuestionnaireManager/style";

.edit-container {
  padding: 4px 20px;
  margin: 20px 0;
  overflow-y: auto;
  pointer-events: all;
  border-radius: $q-border-radius-normal;
  transition: $q-transition-speed1;
}

.edit-area {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px 0;
  clear: both;
  border-radius: $q-border-radius-normal;
  transition: all 18s;
}

.action-right {
  align-self: flex-end;
}

.add-btn {
  margin: 10px 0;
}

.row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.transition-group {
  transition: all 0.8s;
}

.row > .col {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #303030;
  text-align: left;
}
</style>
