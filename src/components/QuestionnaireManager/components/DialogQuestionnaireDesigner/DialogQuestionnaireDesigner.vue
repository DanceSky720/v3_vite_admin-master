<template>
  <el-dialog
    v-model="data.open"
    title="问卷编辑面板"
    width="80%"
    :before-close="handleClose"
  >
    <el-form v-if="questionnaire">
      <el-form-item label="问卷名">
        <el-input
          v-model="questionnaire.title"
          class="title-input"
          show-word-limit
          placeholder="请输入问卷名"
          size="large"
        />
      </el-form-item>
    </el-form>
    <div
      v-if="questionnaire"
      class="dialog-container"
    >
      <div class="dialog-container-left">
        <TopicSelector
          v-model="data.dancer"
          @chosen="addOneSubject"
        />
        <PanelTopicDesigner
          v-model="questionnaire.subjectList[data.currentIndex]"
          class="dialog-container-left-designer"
          @add-option="addOption(data.currentIndex)"
        />
      </div>
      <QuestionnaireDesigner
        v-model="questionnaire"
        @save="$emit('save')"
        @add-subject="addOneSubject(data.dancer as QuestionnaireSupportType)"
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
import useQuestionnaireDesigner from '../../hooks/useQuestionnaireDesigner'
import TopicSelector from '../TopicSelector/TopicSelector.vue'
import { PropType, reactive, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
const { questionnaire, addSubject, reborn, remove, addOption } = useQuestionnaireDesigner()

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
  }
})

const data: DialogQuestionnaireDesignerData = reactive({
  open: false,
  dancer: '',
  currentIndex: 0
})

const emit = defineEmits(['update:modelValue', 'update:show', 'close', 'save'])

watch(
  [() => props.modelValue, () => props.show],
  ([mv, show]) => {
    questionnaire.value = mv
    data.open = show
  },
  { immediate: true, deep: true }
)

watch(() => questionnaire.value, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => data.open, (newValue) => {
  emit('update:show', newValue)
})

/**
 * 添加一个问卷项目
 * @param type 问卷类型
 */
function addOneSubject(type: QuestionnaireSupportType) {
  if (!type || !questionnaire.value?.subjectList) {
    return
  }
  addSubject(type)
  data.currentIndex = questionnaire.value.subjectList.length - 1
}
/**
 * 拖拽离开该组件时,移除题目
 */
function dragleave() {
  if (!(data.dancer.length > 0)) {
    return
  }
  if (questionnaire.value) {
    remove(questionnaire.value.subjectList.length - 1)
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
