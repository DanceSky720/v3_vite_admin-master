<template>
  <div class="edit-container">
    <div v-if="!empty">
      <p class="edit-container_title">
        题目属性
      </p>
      <div class="edit-area">
        <template v-if="questionnaireSubject.data">
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
        </template>
        <el-form>
          <TransitionGroup
            name="bounce"
            tag="div"
            class="transition-group"
          >
            <div
              v-for="(option, index) in questionnaireSubject.data.options"
              :key="option.id"
              draggable="true"
              class="options"
              :class="data.dancing ? 'event-done' : ''"
              @dragenter="dragenter($event, index)"
              @dragover="$event.preventDefault()"
              @dragstart="dragstart(index)"
              @dragend="data.dancing = false"
            >
              <el-divider content-position="left">
                <h3>选项{{ index + 1 }}</h3>
              </el-divider>
              <el-form-item class="action-right">
                <el-button
                  :icon="Rank"
                  circle
                  plain
                />
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
                  type="number"
                  placeholder="请输入分数"
                />
              </el-form-item>
              <el-form-item label="说明">
                <el-input
                  v-model="option.explain"
                  placeholder="请输入说明"
                />
              </el-form-item>
            </div>
          </TransitionGroup>
        </el-form>
      </div>
    </div>
    <div
      v-else
      class="panel-empty-view"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Delete,
  ArrowUpBold,
  ArrowDownBold,
  Plus,
  Rank
} from '@element-plus/icons-vue'
import { computed, PropType, reactive, ref, watch } from 'vue'
import { QuestionnaireSupportType } from '../../../entity/enum/QuestionnaireSupportType.entity';
import util from '../util';

const props = defineProps({
  /**
   * 题目
   */
  modelValue: {
    type: Object as PropType<QuestionnaireSubject>,
    default: undefined
  },
  /**
   * 是否选中题目
   */
  empty: {
    type: Boolean,
    default: false
  }
})
/**
 * 题目
 */
const questionnaireSubject = reactive({
  data: {} as QuestionnaireSubject
})

const data: PanelTopicDesignerData = reactive({
  dancer: 0,
  dancing: false
})

// TODO 为没有唯一值的options寻找唯一值
/**
 * 是否是选择型
 */
const selective = computed(() => {
  if (questionnaireSubject) {
    return (
      questionnaireSubject?.data?.type === QuestionnaireSupportType.CHECKBOX ||
      questionnaireSubject?.data?.type === QuestionnaireSupportType.RADIO
    )
  }
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
    id: new Date().getTime().toString(),
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
/**
 * 拖拽进入时,交换值
 * @param event 拖拽事件
 * @param index 交换的元素下标
 */
function dragenter(event: DragEvent, index: number) {
  event.preventDefault()
  if (data.dancer === index) {
    return
  }
  questionnaireSubject.data.options = util.swapPlaces(
    questionnaireSubject.data.options,
    index,
    data.dancer
  )
  data.dancer = index
}
/**
 * 拖拽开始,更新数据
 * @param index 选中的元素下标
 */
function dragstart(index: number) {
  data.dancing = true
  data.dancer = index
}
</script>

<style lang="scss" scoped>
@import "../style";

.edit-container {
  min-width: 280px;
  padding: 4px 20px;
  margin: 20px 0;
  overflow-y: auto;
  pointer-events: all;
  border-radius: $q-border-radius-normal;
  box-shadow: $q-box-shadow-normal;
  transition: $q-transition-speed1;

  &_title {
    box-sizing: border-box;
    width: 100%;
    margin: 10px 0;
    font-size: 28px;
    text-align: center;
  }
}

.edit-area {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px 0;
  clear: both;
  border-radius: $q-border-radius-normal;
  transition: $q-transition-speed1;
}

.action-right {
  align-self: flex-end;
}

.add-btn {
  margin: 10px 0;
}

.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.event-done  {
  * {
    pointer-events: none;
  }
}

.panel-empty-view {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.panel-empty-view::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  font-size: 22px;
  text-align: center;
  content: "没有选中的组件";
  transform: translate(-50%, -50%);
}
</style>
