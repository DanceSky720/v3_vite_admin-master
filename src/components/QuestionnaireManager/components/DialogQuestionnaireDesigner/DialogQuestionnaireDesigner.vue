<template>
  <el-dialog
    v-model="data.open"
    title="问卷编辑面板"
    width="80%"
    :before-close="handleClose"
  >
    <el-form v-if="data.questionnaire">
      <el-form-item label="问卷名">
        <el-input
          v-model="data.questionnaire.title"
          class="title-input"
          show-word-limit
          placeholder="请输入问卷名"
          size="large"
        />
      </el-form-item>
    </el-form>
    <div
      v-if="data.questionnaire"
      class="dialog-container"
    >
      <div class="dialog-container-left">
        <TopicSelector
          v-model="data.dancer"
          @chosen="addSubject"
        />
        <PanelTopicDesigner
          v-model="data.questionnaire.subjectList[data.currentIndex]"
          class="dialog-container-left-designer"
        />
      </div>
      <QuestionnaireDesigner
        v-model="data.questionnaire"
        @save="$emit('save')"
        @add-subject="addSubject(data.dancer as QuestionnaireSupportType)"
        @dragleave="dragleave()"
        @view="data.currentIndex = $event"
        @close="handleClose"
        @reset="reborn"
      />
    </div>
    <div
      v-else
      class="dialog-container-empty-view"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import { QuestionnaireSupportType } from '@/entity/enum/QuestionnaireSupportType.entity'
import QuestionnaireDesigner from '../QuestionnaireDesigner/QuestionnaireDesigner.vue'
import PanelTopicDesigner from '../PanelTopicDesigner/PanelTopicDesigner.vue'
import TopicSelector from '../TopicSelector/TopicSelector.vue'
import { PropType, reactive, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import util from '../../util'
import { QuestionnaireStatus } from '../../../../entity/enum/QuestionnaireStatus.entity'

const props = defineProps({
  /**
   * 问卷
   */
  modelValue: {
    type: Object as PropType<QuestionnaireEditorialVersion>,
    default: undefined
  },
  /**
   * 显隐控制
   */
  show: {
    type: Boolean,
    default: false
  }
})

const data: DialogQuestionnaireDesignerData = reactive({
  questionnaire: undefined,
  open: false,
  dancer: '',
  currentIndex: 0
})
const emit = defineEmits(['update:modelValue', 'update:show', 'close', 'save'])

watch(
  [() => props.modelValue, () => props.show],
  ([questionnaire, show]) => {
    data.questionnaire = questionnaire
    data.open = show
  },
  { immediate: true, deep: true }
)

watch(() => data.questionnaire, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => data.open, (newValue) => {
    emit('update:show', newValue)
  }
)
/**
 * 添加一个问卷项目
 */
function addSubject(type: QuestionnaireSupportType) {
  if (!type) {
    return
  }
  if (!data?.questionnaire?.subjectList) {
    return
  }
  data?.questionnaire?.subjectList.push({
    id: undefined,
    title: undefined,
    serialNumber: undefined,
    type: type,
    options: [],
    rid: new Date().getTime()
  })
  data.currentIndex = data.questionnaire.subjectList.length - 1
}
/**
 * 拖拽离开该组件时,移除题目
 */
function dragleave() {
  if (!(data.dancer.length > 0)) {
    return
  }
  if (data.questionnaire) {
    data.questionnaire.subjectList = util.remove<QuestionnaireSubjectEditorialVersion>(data.questionnaire.subjectList, data.questionnaire.subjectList.length - 1)
  }
}

/**
 * 重置问卷数据
 */
function reborn() {
  data.questionnaire = {
    id: undefined,
    title: undefined,
    details: undefined,
    totalScore: undefined,
    isEnable: QuestionnaireStatus.ALIVE, // 默认启用
    createDate: undefined,
    lastUpdateUserName: undefined,
    lastUpdateDate: undefined,
    type: undefined,
    subjectList: []
  }
}
/**
 * 关闭前处理函数
 */
async function handleClose() {
  if (!props.modelValue) {
    emit('close')
    return
  }
  try {
    const res = await ElMessageBox.confirm('问卷未保存', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    if (res === 'confirm') {
      emit('close')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
.dialog-container {
  display: flex;
  transition: all 1s;

  &-left {
    display: flex;
    flex-direction: column;

    &-designer {
      flex: 1;
    }
  }
}

.dialog-container-empty-view {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 400px;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 22px;
    color: #808080;
    content: "无绑定的问卷无数据";
    transform: translate(-50%, -50%);
  }
}
</style>
