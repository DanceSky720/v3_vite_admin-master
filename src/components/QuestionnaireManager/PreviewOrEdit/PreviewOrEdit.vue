<template>
  <div class="preview-container">
    <p class="title">
      {{ questionnaire.data.title }}
    </p>
    <el-form
      inline
    >
      <el-form-item
        v-if="!preview"
        class="label-item"
        label="问卷名"
      >
        <el-input
          v-model="questionnaire.data.title"
          class="title-input"
          show-word-limit
          placeholder="请输入问卷名"
          clearable
        />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group
          v-model="questionnaire.data.isEnable"
          :disabled="preview"
        >
          <el-radio :label="1">
            是
          </el-radio>
          <el-radio :label="0">
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
      <el-button
        class="btn"
        :icon="open ? TurnOff : Open"
        plain
        @click="open = !open"
      >
        {{ open ? '关闭' : '展开' }}
      </el-button>
    </div>
    <TransitionGroup
      name="bounce"
      tag="div"
      class="transition-group"
    >
      <div
        v-for="(subject, index) in questionnaire.data.subjectList"
        :key="subject.id"
        class="subject"
      >
        <div class="subject-title">
          <p>
            <span>
              {{ index + 1 }}
            </span>
            <span>. &nbsp;</span>
            <span>
              {{ subject.title }}
            </span>
            <span> ({{ subjectType(subject.type) }}) </span>
          </p>
          <div v-if="!preview">
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
          v-if="subject.type === 'checkbox'"
          class="group"
        >
          <el-checkbox
            v-for="option in subject.options"
            :key="option.title"
            :label="option.title"
          />
        </div>
        <div
          v-if="subject.type === 'radio'"
          class="group"
        >
          <el-radio
            v-for="option in subject.options"
            :key="option.title"
            :label="option.title"
          />
        </div>
        <Transition name="bounce">
          <PanelTopicEditor
            v-if="!preview && open"
            v-model="questionnaire.data.subjectList[index]"
          />
        </Transition>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import {
  Delete,
  ArrowUpBold,
  ArrowDownBold,
  Open,
  TurnOff,
  DocumentAdd
} from '@element-plus/icons-vue'
import { computed, PropType, reactive, ref, watch } from 'vue'
import util from '../util'
import PanelTopicEditor from '../PanelTopicEditor/PanelTopicEditor.vue'
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

/**
 * 问卷
 */
const questionnaire = reactive({
  data: {} as Questionnaire
})

/**
 * 是否展开题目编辑面板
 */
const open = ref(false)
/**
 * 是否允许点击保存按钮
 */
const allow = computed(() => {
  const checkArray = [
    hasUniqueTitle(questionnaire.data.subjectList),
    emptyTitle(questionnaire.data.subjectList),
    emptyOptions(questionnaire.data.subjectList),
    emptyOptionsTitles(questionnaire.data.subjectList),
    questionnaire.data.subjectList.length > 0,
    questionnaire.data.title ? questionnaire.data.title.length > 0 : false,
    questionnaire.data.type ? questionnaire.data.type.length > 0 : false
  ]
  return checkArray.every((pass: boolean) => pass)
})
const emit = defineEmits(['update:modelValue', 'save'])

watch(
  () => props.modelValue,
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
 * 是否有空选项
 * @param list 要检查的数组
 */
function emptyOptions(list: QuestionnaireSubject[]) {
  return list.every(
    (subject: QuestionnaireSubject) => subject.options.length > 0
  )
}
/**
 * 是否有空选项标题
 * @param list 要检查的数组
 */
function emptyOptionsTitles(list: QuestionnaireSubject[]) {
  return list.every((subject: QuestionnaireSubject) => {
    return subject.options.every((option: SubjectOption) =>
      option.title ? option.title.length > 0 : false
    )
  })
}
/**
 * 获取题目类型的翻译
 * @param type 题目类型
 */
function subjectType(type: string | undefined) {
  if (type === 'checkbox') {
    return '多选题'
  }
  if (type === 'radio') {
    return '单选题'
  }
  return '未定义'
}
</script>

<style lang="scss" scoped>
.preview-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  margin: 20px;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 0px 6px rgb(226, 226, 226);
  overflow: hidden;
  border-radius: 6px;
  transition: all 0.5s;
}

.title {
  margin: 20px 0;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
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
  margin: 18px 0;
  padding: 20px;
  border-radius: 6px;
  border: none;
  box-shadow: 0px 0px 4px rgb(231, 231, 231);
  transition: all 0.4s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 0px 20px rgb(199, 199, 199);
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
  padding: 0 20px;
  flex-direction: row-reverse;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: translateY(0);
    opacity: 0;
  }

  50% {
    transform: translateY(40px);
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
