<template>
  <div class="edit-container">
    <el-button
      class="add-btn"
      type="primary"
      :disabled="!allow"
      @click="addOption"
      plain
      >添加新选项</el-button
    >
    <div class="edit-area">
      <el-form>
        <el-form-item label="题目" size="large">
          <el-input
            v-model="questionnaireSubject.data.title"
            size="large"
            placeholder="为题目添加标题"
          />
        </el-form-item>
        <p
          class="row"
          v-if="questionnaireSubject.data.type === 'checkbox' || 'radio'"
        >
          <span class="col">选项标题</span>
          <span class="col">选项说明</span>
          <span class="col">分数</span>
          <span class="col col-last">操作</span>
        </p>
        <TransitionGroup name="fade" tag="div" class="transition-group">
          <div
            class="row"
            v-for="(option, index) in questionnaireSubject.data.options"
            :key="index"
          >
          <!-- // TODO 为没有唯一值的options寻找唯一值 -->
            <el-input
              class="col"
              v-model="option.title"
              placeholder="请输入标题"
            />
            <el-input
              class="col"
              v-model="option.explain"
              placeholder="请输入说明"
            />
            <el-input
              class="col"
              type="number"
              v-model="option.fraction"
              placeholder="请输入分数"
            />
            <div class="col-last">
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
            </div>
          </div>
        </TransitionGroup>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete, ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue'
import { computed, PropType, reactive, watch } from 'vue'
import util from '../util'
const props = defineProps({
  /**
   * 题目
   */
  modelValue: {
    type: Object as PropType<QuestionnaireSubject>,
    default: undefined,
  },
})

/**
 * 题目
 */
let questionnaireSubject = reactive({
  data: {
    id: undefined,
    title: undefined,
    serialNumber: undefined,
    type: undefined,
    options: [],
  } as QuestionnaireSubject,
})
// TODO 为没有唯一值的options寻找唯一值

const emit = defineEmits(['update:modelValue'])

/**
 * 是否允许添加新的选项
 */
let allow = computed(() => {
  const isTitle =  questionnaireSubject.data.options.every(
      (option: SubjectOption) => option.title !== ''
    )
  const checkArray: Array<Boolean> = [
    isTitle,
    questionnaireSubject.data.options.length < 4
  ]
  return checkArray.every((pass: Boolean) => pass)
})

watch(() => props.modelValue, (modelValue) => {
    if (modelValue) {
      questionnaireSubject.data = modelValue
    }
  },
  { immediate: true }
)

watch(questionnaireSubject.data, (newValue) => {
  emit('update:modelValue', newValue)
})

/**
 * 上移数组元素
 * @param index 要上移的元素下标
 */
function upwards(index: number) {
  questionnaireSubject.data.options = util.upwards<SubjectOption>(
    questionnaireSubject.data.options,
    index
  )
}

/**
 * 下移数组元素
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
    fraction: undefined,
  })
}

/**
 * 移除数组元素
 * @param index 要移除的元素下标
 */
function remove(index: number) {
  questionnaireSubject.data.options.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.edit-container {
  padding: 4px 20px;
  min-width: 440px;
  background-color: #f0f0f0;
  border-radius: 6px;
}

.edit-area {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 20px;
  border-radius: 6px;
  background-color: rgb(226, 226, 226);
  clear: both;
  transition: all 18s;
}

.add-btn {
  margin: 10px 0;
  float: right;
}

.row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.transition-group {
  transition: all 0.8s;
  background: #cecece;
}

.row > .col {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  text-align: left;
  background: #cecece;
  color: #303030;
  font-weight: bold;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.row > .col-last {
  flex: 2;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.4) translate(60px, 0);
}
</style>
