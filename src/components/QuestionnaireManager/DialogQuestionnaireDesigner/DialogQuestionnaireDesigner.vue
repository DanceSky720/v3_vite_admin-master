<template>
  <el-dialog
    v-model="data.open"
    title="问卷编辑面板"
    width="90%"
    :before-close="handleClose"
  >
    <div class="dialog-container">
      <TopicSelector
        v-model="data.dancer"
        @chosen="addSubject"
      />
      <QuestionnaireDesigner
        v-model="data.questionnaire"
        :questionnaire-type="questionnaireType"
        @save="$emit('save')"
        @add-subject="addSubject(data.dancer as QuestionnaireSupportType)"
        @view="data.currentIndex = $event"
      />
      <PanelTopicDesigner
        v-model="data.questionnaire.subjectList[data.currentIndex]"
      />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { QuestionnaireSupportType } from '../../../entity/enum/QuestionnaireSupportType.entity'
import QuestionnaireDesigner from '../QuestionnaireDesigner/QuestionnaireDesigner.vue'
import PanelTopicDesigner from '../PanelTopicDesigner/PanelTopicDesigner.vue'
import TopicSelector from '../TopicSelector/TopicSelector.vue'
import { PropType, reactive, watch } from 'vue'
import { ElMessageBox } from 'element-plus'

const props = defineProps({
  /**
   * 问卷
   */
  modelValue: {
    type: Object as PropType<Questionnaire>,
    default: undefined
  },
  /**
   * 显隐控制
   */
  show: {
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

const data: DialogQuestionnaireDesignerData = reactive({
  questionnaire: undefined,
  open: false,
  dancer: '',
  currentIndex: 0
})
const emit = defineEmits(['update:modelValue', 'update:show', 'close', 'save'])

watch(
  [() => props.modelValue, () => props.show],
  ([modelValue, show]) => {
    data.questionnaire = modelValue
    data.open = show
  },
  { immediate: true, deep: true }
)

watch(data.questionnaire, (newValue) => {
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
  data.questionnaire.subjectList.push({
    id: new Date().getTime().toString(),
    title: undefined,
    serialNumber: undefined,
    type: type,
    options: []
  })
  data.currentIndex = data.questionnaire.subjectList.length - 1
}
/**
 * 关闭前处理函数
 */
async function handleClose() {
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
}
</style>
