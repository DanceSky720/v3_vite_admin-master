<template>
  <div class="edit-container">
    <div v-if="modelValue">
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
              v-for="(option, index) in questionnaireSubject?.data?.options"
              :key="option.id ?? option.title"
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
  ArrowDownBold,
  ArrowUpBold,
  Delete,
  Plus,
  Rank
} from '@element-plus/icons-vue'
import { PropType, reactive, watch } from 'vue'
import useTopicDesigner from '../../hooks/useTopicDesigner'
import util from '../../util'

const props = defineProps({
  /**
   * 题目
   */
  modelValue: {
    type: Object as PropType<QuestionnaireSubject>,
    default: undefined
  }
})

const data: PanelTopicDesignerData = reactive({
  dancer: 0,
  dancing: false
})

const {
  questionnaireSubject,
  upwards,
  downward,
  addOption,
  remove,
  selective,
  allow
} = useTopicDesigner()

// TODO 为没有唯一值的options寻找唯一值

const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue,(mv) => {
    if (mv) {
      questionnaireSubject.data = mv
    }
  },
  { immediate: true }
)

watch(() => questionnaireSubject.data,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

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
  if (!questionnaireSubject.data) {
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
@import '../../style';

.edit-container {
  min-width: 280px;
  padding: 4px 20px;
  margin: 20px 0;
  overflow-x: hidden;
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

.event-done {
  * {
    pointer-events: none;
  }
}

.panel-empty-view {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    font-size: 22px;
    text-align: center;
    content: '没有选中的组件';
    transform: translate(-50%, -50%);
  }
}
</style>
