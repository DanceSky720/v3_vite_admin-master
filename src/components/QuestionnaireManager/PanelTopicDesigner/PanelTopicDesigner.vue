<template>
  <div class="edit-container"
    :style="{boxShadow: shadow(questionnaireSubject.data)}"
  >
    <el-button
      v-if="questionnaireSubject.data.type === 'checkbox' || 'radio'"
      class="add-btn"
      type="primary"
      :disabled="!allow"
      plain
      @click="addOption"
    >
      添加新选项
    </el-button>
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
        <p
          v-if="questionnaireSubject.data.type === 'checkbox' || 'radio'"
          class="row"
        >
          <span class="col">选项标题</span>
          <span class="col">选项说明</span>
          <span class="col">分数</span>
          <span class="col col-last">操作</span>
        </p>
        <TransitionGroup
          name="fade"
          tag="div"
          class="transition-group"
        >
          <div
            v-for="(option, index) in questionnaireSubject.data.options"
            :key="index"
            class="row"
          >
            <!-- // TODO 为没有唯一值的options寻找唯一值 -->
            <el-input
              v-model="option.title"
              class="col"
              placeholder="请输入标题"
            />
            <el-input
              v-model="option.explain"
              class="col"
              placeholder="请输入说明"
            />
            <el-input
              v-model="option.fraction"
              class="col"
              type="number"
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
    default: null
  }
})

/**
 * 题目
 */
const questionnaireSubject = reactive({
  data: { } as QuestionnaireSubject
})
// TODO 为没有唯一值的options寻找唯一值

const emit = defineEmits(['update:modelValue'])

/**
 * 题目项目是否大于2的阴影
 * @param subject 题目
 */
 function shadow (subject: QuestionnaireSubject) {
  const normal = '0px 0px 6px rgb(226, 226, 226)'
  if(subject.type === 'input'){
    return normal
  }
  if(subject.type === 'checkbox' || 'radio') {
    return subject.options.length > 0 ? normal : '0px 0px 6px #F56C6C' 
  }
}

/**
 * 是否允许添加新的选项
 */
const allow = computed(() => {
  const isTitle = questionnaireSubject.data.options.every(
    (option: SubjectOption) => option.title !== ''
  )
  const checkArray: Array<boolean> = [
    isTitle,
    questionnaireSubject.data.options.length < 4
  ]
  return checkArray.every((pass: boolean) => pass)
})

watch(() => props.modelValue, (modelValue) => {
    questionnaireSubject.data = modelValue
},{ immediate: true }
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
  @import "../style";

.edit-container {
  padding: 4px 20px;
  margin: 20px 0;
  background-color: #f0f0f0;
  border-radius: $q-border-radius-normal;
  transition: $q-transition-speed1;
}

.edit-area {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 20px;
  border-radius: $q-border-radius-normal;
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
