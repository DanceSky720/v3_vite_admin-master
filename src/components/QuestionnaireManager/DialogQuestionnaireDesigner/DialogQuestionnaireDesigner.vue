<template>
  <el-dialog
    v-model="data.open"
    title="问卷编辑面板"
    width="90%"
    :before-close="handleClose"
  >
    <div class="dialog-container">
      <TopicSelector v-model="data.dancer" @chosen="addSubject" />
      <QuestionnaireDesigner
        v-model="questionnaire.data"
        :questionnaire-type="questionnaireType"
        @save="$emit('save')"
        @add-subject="addSubject(data.dancer as QuestionnaireSupportType)"
        @view="data.currentIndex = $event"
      />
      <PanelTopicDesigner
        v-model="questionnaire.data.subjectList[data.currentIndex]"
        :empty="questionnaire.data.subjectList.length < 1"
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
    default: null,
  },
  /**
   * 显隐控制
   */
  show: {
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

const data: DialogQuestionnaireDesignerData = reactive({
  open: false,
  dancer: '',
  currentIndex: 0,
})
const emit = defineEmits(['update:modelValue', 'update:show', 'close', 'save'])

watch(
  [() => props.modelValue, () => props.show],
  ([modelValue, show]) => {
    questionnaire.data = modelValue
    data.open = show
  },
  { immediate: true, deep: true }
)

watch(questionnaire.data, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => data.open, (newValue) => {
  emit('update:show', newValue)
})
/**
 * 添加一个问卷项目
 */
function addSubject(type: QuestionnaireSupportType) {
  questionnaire.data.subjectList.push({
    id: new Date().getTime().toString(),
    title: undefined,
    serialNumber: undefined,
    type: type,
    options: [],
  })
  data.currentIndex = questionnaire.data.subjectList.length - 1
}
/**
 * 关闭前处理函数
 */
async function handleClose() {
  try {
    const res = await ElMessageBox.confirm(
      '取消保存后,所做的改变不会生效',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
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
