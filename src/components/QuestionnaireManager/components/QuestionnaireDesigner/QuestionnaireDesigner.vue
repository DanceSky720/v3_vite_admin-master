<template>
  <div class="questionnaire-designer-container">
    <div v-if="questionnaire.data">
      <div class="questionnaire-title">
        <el-input
          v-if="!preview"
          v-model="questionnaire.data.title"
          :disabled="preview"
          class="title-input"
          show-word-limit
          placeholder="请输入问卷名"
          size="large"
        />
        <p v-else>
          {{ questionnaire.data.title }}
        </p>
      </div>
      <el-form inline>
        <el-form-item
          v-if="!preview"
          label="是否启用"
        >
          <el-radio-group
            v-model="questionnaire.data.isEnable"
            :disabled="preview"
          >
            <el-radio :label="QuestionnaireStatus.ALIVE">
              是
            </el-radio>
            <el-radio :label="QuestionnaireStatus.SILENCE">
              否
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="!preview"
          label="问卷类型"
          :disabled="preview"
        >
          <el-select
            v-model="questionnaire.data.type"
            placeholder="选择问卷类型"
          >
            <el-option
              v-for="item in questionnaireType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-input
          v-if="!preview"
          v-model="questionnaire.data.details"
          class="questionnaire-details"
          :rows="3"
          :disabled="preview"
          type="textarea"
          placeholder="问卷说明"
        />
      </el-form>
      <div
        v-if="!preview"
        class="btn-group"
      >
        <el-button
          class="btn"
          :icon="DocumentAdd"
          plain
          type="primary"
          :disabled="!allow"
          @click="$emit('save')"
        >
          保存
        </el-button>
      </div>
      <TransitionGroup
        id="questionnaire-designer-transition-group"
        :class="`${!props.preview ? 'designer-tip-box' : ''} events-none`"
        name="bounce"
        tag="div"
        @dragenter="$emit('add-subject')"
        @dragover="$event.preventDefault()"
        @dragleave="dragleave()"
      >
        <div
          v-for="(subject, index) in questionnaire.data.subjectList"
          :key="subject.id"
          :style="{ boxShadow: shadow(subject) }"
          :class="preview ? '' : 'relative-subject'"
          class="subject"
        >
          <div class="subject-title">
            <p>
              <span>
                {{ index + 1 }}
              </span>
              <span>. &nbsp;</span>
              <span>
                {{ subject.title || "无标题" }}
              </span>
              <span> ({{ subjectType(subject.type) }}) </span>
            </p>
            <div
              v-if="!preview"
              class="action-btn-ground"
            >
              <el-button
                class="list-btn"
                :icon="Search"
                plain
                circle
                @click="$emit('view', index)"
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
            </div>
          </div>
          <div
            v-if="subject.type === QuestionnaireSupportType.CHECKBOX"
            class="group"
          >
            <el-checkbox
              v-for="option in subject.options"
              :key="option.title"
              :label="option.title"
            />
          </div>
          <div
            v-if="subject.type === QuestionnaireSupportType.RADIO"
            class="group"
          >
            <el-radio
              v-for="option in subject.options"
              :key="option.title"
              :label="option.title"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div
      v-else
      class="questionnaire-designer-empty-view"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ArrowDownBold,
  DocumentAdd,
  ArrowUpBold,
  Delete,
  Search
} from '@element-plus/icons-vue'
import { QuestionnaireSupportType } from '@/entity/enum/QuestionnaireSupportType.entity'
import { QuestionnaireStatus } from '@/entity/enum/QuestionnaireStatus.entity'
import useQuestionnaireDesigner from '../../hooks/useQuestionnaireDesigner'
import { PropType, watch } from 'vue'
const props = defineProps({
  /**
   * 问卷
   */
  modelValue: {
    type: Object as PropType<Questionnaire>,
    default: undefined
  },
  /**
   * 预览模式
   */
  preview: {
    type: Boolean,
    default: false
  },
  /**
   * 问卷类型数组
   */
  questionnaireType: {
    type: Array as PropType<questionnaireType[]>,
    default: []
  }
})

const { questionnaire, upwards, downward, remove, allow, subjectType } =
  useQuestionnaireDesigner()

const emit = defineEmits(['update:modelValue', 'save', 'add-subject', 'view'])

watch(() => props.modelValue,
  (newValue) => {
    questionnaire.data = newValue
  },
  { immediate: true, deep: true }
)

watch(() => questionnaire.data,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

/**
 * 题目的阴影
 * @param subject 题目
 */
function shadow(subject: QuestionnaireSubject) {
  return subject.title || props.preview
    ? '0px 0px 12px rgb(226, 226, 226)'
    : '0px 0px 12px #FD9090'
}

/**
 * 拖拽离开该组件时,移除题目事件
 */
function dragleave() {
  if (questionnaire.data) {
    remove(questionnaire.data.subjectList.length - 1)
  }
}
</script>

<style lang="scss" scoped>
@import "../../style";

.questionnaire-designer-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 20px;
  overflow-y: auto;
  background: #fff;
  border-radius: $q-border-radius-normal;
  box-shadow: $q-box-shadow-normal;
  transition: all 0.5s;
}

.action-btn-ground {
  pointer-events: all;
}

.designer-tip-box {
  position: relative;
  min-height: 200px;
  padding-top: 10px;
  margin-top: 20px;
  overflow-x: hidden;
  border: 1px dashed #969696;
  border-radius: $q-border-radius-normal;
}

.designer-tip-box::before {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9999998;
  box-sizing: border-box;
  height: 20px;
  line-height: 20px;
  color: #949494;
  text-align: center;
  content: "点击左侧按钮或拖拽至此处";
  background: #fff;
  border-radius: $q-border-radius-normal;
  transform: translate(-50%, -50%);
}

.events-none > * {
  pointer-events: none;
}

.questionnaire-title {
  margin: 20px 0;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}

.title-input {
  margin-bottom: 20px;
}

.label-item {
  margin: 0 12px 0 0;
}

.questionnaire-details {
  box-sizing: border-box;
  margin-bottom: 10px;
}

.relative-subject {
  position: relative;
}

.subject {
  z-index: 99999999;
  box-sizing: border-box;
  width: 96%;
  padding: 20px;
  margin: 18px auto;
  background: #fff;
  border: none;
  border-radius: 6px;
  box-shadow: $q-box-shadow-normal;
  transition: $q-transition-speed0;

  &:hover {
    transform: translateY(-5px);
  }
}

.subject-title {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  transition: all 0.8s;
}

.group {
  display: flex;
  flex-direction: column;
}

.btn {
  margin-left: 10px;
}

.btn-group {
  display: flex;
  flex-direction: row-reverse;
  padding: 0 20px;
}

.questionnaire-designer-empty-view {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 22px;
    color: #808080;
    content: "无数据";
    transform: translate(-50%, -50%);
  }
}
</style>
