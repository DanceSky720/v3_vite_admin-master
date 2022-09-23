<template>
  <div class="questionnaire-designer-container">
    <div class="title">
      <el-input
        v-if="!preview"
        :disabled="preview"
        v-model="questionnaire.data.title"
        class="title-input"
        show-word-limit
        placeholder="请输入问卷名"
        size="large"
      />
      <p v-else>{{ questionnaire.data.title }}</p>
    </div>
    <el-form inline>
      <el-form-item v-if="!preview" label="是否启用">
        <el-radio-group
          v-model="questionnaire.data.isEnable"
          :disabled="preview"
        >
          <el-radio :label="QuestionnaireStatus.ALIVE"> 是 </el-radio>
          <el-radio :label="QuestionnaireStatus.SILENCE"> 否 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="!preview" label="问卷类型" :disabled="preview">
        <el-select v-model="questionnaire.data.type" placeholder="选择问卷类型">
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
    <div v-if="!preview" class="btn-group">
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
      @dragenter="dragenter($event)"
      @dragover="$event.preventDefault()"
      @dragleave="dragleave($event)"
    >
      <div
        v-for="(subject, index) in questionnaire.data.subjectList"
        :key="subject.id"
        :style="{ boxShadow: shadow(subject) }"
        class="subject"
      >
        <div class="subject-title">
          <p>
            <span>
              {{ index + 1 }}
            </span>
            <span>. &nbsp;</span>
            <span>
              {{ subject.title  || '标题未填写' }}
            </span>
            <span> ({{ subjectType(subject.type) }}) </span>
          </p>
          <div v-if="!preview" class="action-btn-ground">
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
</template>

<script setup lang="ts">
import {
  ArrowDownBold,
  DocumentAdd,
  ArrowUpBold,
  Delete,
  Search,
} from '@element-plus/icons-vue'
import { QuestionnaireSupportType } from '../../../entity/enum/QuestionnaireSupportType.entity'
import { QuestionnaireStatus } from '../../../entity/enum/QuestionnaireStatus.entity'
import { computed, PropType, reactive, watch } from 'vue'
import util from '../util'
const props = defineProps({
  /**
   * 问卷
   */
  modelValue: {
    type: Object as PropType<Questionnaire>,
    default: undefined,
  },
  /**
   * 预览模式
   */
  preview: {
    type: Boolean,
    default: false,
  },
  /**
   * 问卷类型数组
   */
  questionnaireType: {
    type: Array as PropType<questionnaireType[]>,
    default: [],
  },
})

/**
 * 问卷
 */
const questionnaire = reactive({
  data: {} as Questionnaire,
})

/**
 * 是否允许点击保存按钮
 */
const allow = computed(() => {
  const checkArray = [
    hasUniqueTitle(questionnaire.data.subjectList),
    emptyTitle(questionnaire.data.subjectList),
    questionnaire.data.subjectList.length > 0,
    questionnaire.data.title ? questionnaire.data.title.length > 0 : false,
    questionnaire.data.type ? questionnaire.data.type.length > 0 : false,
  ]
  return checkArray.every((pass: boolean) => pass)
})

const emit = defineEmits(['update:modelValue', 'save', 'add-subject', 'view'])

watch(() => props.modelValue,
  (newValue) => {
    if (newValue) {
      questionnaire.data = newValue
    }
  },
  { immediate: true, deep: true }
)

watch(questionnaire.data, (newValue) => {
  emit('update:modelValue', newValue)
})

/**
 * 上移题目
 * @param index 要上移的元素下标
 */
function upwards(index: number) {
  questionnaire.data.subjectList = util.upwards<QuestionnaireSubject>(
    questionnaire.data.subjectList,
    index
  )
}
/**
 * 下移题目
 * @param index 要下移的元素下标
 */
function downward(index: number) {
  questionnaire.data.subjectList = util.downward<QuestionnaireSubject>(
    questionnaire.data.subjectList,
    index
  )
}
/**
 * 移除题目
 * @param index 要移除的元素下标
 */
function remove(index: number) {
  questionnaire.data.subjectList.splice(index, 1)
}
/**
 * 是否拥有相同的标题
 * @param list 要检查的数组
 */
function hasUniqueTitle(list: QuestionnaireSubject[]) {
  return (
    new Set(list.map((subject: QuestionnaireSubject) => subject.title)).size ===
    list.length
  )
}
/**
 * 是否有空标题
 * @param list 要检查的数组
 */
function emptyTitle(list: QuestionnaireSubject[]) {
  return list.every((subject: QuestionnaireSubject) => subject.title?.length)
}
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
 * 拖拽进入该组件时,添加题目事件
 * @param event 拖拽事件
 */
function dragenter(event: DragEvent) {
    emit('add-subject')
}
/**
 * 拖拽离开该组件时,移除题目事件
 * @param event 拖拽事件
 */
function dragleave(event: DragEvent) {
    remove(questionnaire.data.subjectList.length - 1)

}

/**
 * 获取题目类型的翻译
 * @param type 题目类型
 */
function subjectType(type: string | undefined) {
  if (type === QuestionnaireSupportType.CHECKBOX) {
    return '多选题'
  }
  if (type === QuestionnaireSupportType.RADIO) {
    return '单选题'
  }
  if (type === QuestionnaireSupportType.INPUT) {
    return '主观题'
  }
  return '未定义'
}
</script>

<style lang="scss" scoped>
@import '../style';

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
  margin-top: 20px;
  min-height: 200px;
  border: 1px dashed rgb(150, 150, 150);
  border-radius: $q-border-radius-normal;
}

.designer-tip-box::before {
  position: absolute;
  content: '点击左侧按钮或拖拽至此处';
  left: 50%;
  top: -10px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  box-sizing: border-box;
  color: rgb(148, 148, 148);
  border: 1px dashed rgb(150, 150, 150);
  background: #fff;
  border-radius: $q-border-radius-normal;
  transform: translateX(-50%);
}

.events-none > * {
  pointer-events: none;
}

.title {
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

.subject {
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
</style>
