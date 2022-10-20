<template>
  <div class="edit-container">
    <div v-if="modelValue">
      <p class="edit-container_title">
        题目属性
      </p>
      <div class="edit-area">
        <template v-if="questionnaireSubject">
          <el-form>
            <el-form-item
              label="题目"
              size="large"
            >
              <el-input
                v-model="questionnaireSubject.title"
                size="large"
                placeholder="为题目添加标题"
              />
            </el-form-item>
            <el-form-item
              label="必填"
              size="large"
            >
              <el-switch
                size="large"
                active-text="是"
                inactive-text="否"
              />
            </el-form-item>
          </el-form>
          <el-divider> <h2>选项</h2> </el-divider>
          <el-button
            v-if="selective"
            class="edit-area-add-btn"
            type="primary"
            :disabled="!allow"
            :icon="Plus"
            plain
            @click="$emit('add-option')"
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
              v-for="(option, index) in questionnaireSubject?.options"
              :key="option.id"
              :draggable="drag"
              class="transition-group-options"
              :class="data.dancing ? 'event-done' : ''"
              @dragenter="dragenter(index)"
              @dragover="$event.preventDefault()"
              @dragstart="dragstart(index)"
              @dragend="data.dancing = false"
            >
              <el-form-item>
                <div class="option-line">
                  <el-button
                    v-if="drag"
                    :icon="Rank"
                    circle
                    plain
                  />
                  <el-button
                    type="danger"
                    :icon="Close"
                    circle
                    plain
                    @click="remove(index)"
                  />
                  <el-input
                    v-model="option.title"
                    class="mg-0-10"
                    placeholder="为题目添加标题"
                  />
                  <el-checkbox
                    v-if="QuestionnaireSupportType.CHECKBOX === questionnaireSubject?.type"
                    class="mg-0-10"
                    label="默认"
                    size="large"
                  />
                  <el-radio
                    v-if="QuestionnaireSupportType.RADIO === questionnaireSubject?.type"
                    label="默认"
                    size="large"
                  />
                </div>
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
import { QuestionnaireSupportType } from '@/entity/enum/QuestionnaireSupportType.entity'
import {
  Plus,
  Rank,
  Close
} from '@element-plus/icons-vue'
import { PropType, reactive, watch } from 'vue'
import useTopicDesigner from '../../hooks/useTopicDesigner'

const props = defineProps({
  /**
   * 题目
   */
  modelValue: {
    type: Object as PropType<QuestionnaireSubject>,
    default: undefined
  },
  /**
   * 是否支持拖动
   */
  drag: {
    type: Boolean,
    default: false
  }
})

const data: PanelTopicDesignerData = reactive({
  dancer: 0,
  dancing: false
})

const {
  questionnaireSubject,
  remove,
  selective,
  allow,
  exchangeValue
} = useTopicDesigner()

// TODO 为没有唯一值的options寻找唯一值

const emit = defineEmits(['update:modelValue', 'add-option'])

watch(() => props.modelValue, (mv) => {
  if (!mv) {
    return
  }
  questionnaireSubject.value = mv
}, { immediate: true }
)

watch(() => questionnaireSubject.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

/**
 * 拖拽进入时,交换值
 * @param index 交换的元素下标
 */
function dragenter(index: number) {
  exchangeValue(index, data.dancer)
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
  min-width: 380px;
  max-width: 460px;
  padding: 4px 20px;
  margin: 10px;
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
  align-self: flex-start;
}

.edit-area-add-btn {
  align-self: flex-end;
  margin: 6px 0 14px;
}

.transition-group-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 44px;
}

.option-line {
  display: flex;
  align-items: center;
  justify-content: space-around;
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
    content: "无数据";
    transform: translate(-50%, -50%);
  }
}

.mg-0-10 {
  margin: 0 10px;
}
</style>
