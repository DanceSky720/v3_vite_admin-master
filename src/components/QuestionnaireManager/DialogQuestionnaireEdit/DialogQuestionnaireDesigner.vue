<template>
  <el-dialog
    v-model="open"
    title="问卷编辑面板"
    width="90%"
    :before-close="handleClose"
  >
    <div class="dialog-container">
      <ComponentSelector
        v-model="dragValue"
        @chosen="addSubject"
      />
      <QuestionnaireDesigner
        v-model="questionnaire.data"
        :questionnaire-type="questionnaireType"
        @save="$emit('save')"
        @add-subject="addSubject(dragValue as QuestionnaireSupportType)"
      />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { QuestionnaireSupportType } from '../../../entity/enum/QuestionnaireSupportType.entity'
import QuestionnaireDesigner from '../QuestionnaireDesigner/QuestionnaireDesigner.vue'
import ComponentSelector from '../ComponentSelector/ComponentSelector.vue'
import { PropType, reactive, ref, watch } from 'vue'
import { ElMessageBox } from 'element-plus'

const props = defineProps({
  /**
   * 问卷
   */
  modelValue: {
    type: Object as PropType<Questionnaire>,
    default: null
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

/**
 * 问卷
 */
const questionnaire = reactive({
  data: {} as Questionnaire
})
/**
 * 显隐控制
 */
const open = ref(false)
/**
 * 拖拽的题目类型
 */
const dragValue = ref('')
const emit = defineEmits(['update:modelValue', 'update:show', 'close', 'save'])

watch(
  [() => props.modelValue, () => props.show],
  ([modelValue, show]) => {
    questionnaire.data = modelValue
    open.value = show
  },
  { immediate: true, deep: true }
)

watch(questionnaire.data, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(open, (newValue) => {
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
    options: []
  })
}
/**
 * 移除最后一个题目
*/
function removeSubject() {
  questionnaire.data.subjectList.splice(
    questionnaire.data.subjectList.length - 1,
    1
  )
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
        type: 'warning'
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
