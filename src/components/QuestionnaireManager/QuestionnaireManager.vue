<template>
  <div
    v-loading="loading"
    class="manager-container"
  >
    <OperateBar
      @reload="$emit('reload')"
      @query="$emit('query', $event)"
    />
    <ListQuestionnaire
      :data="data"
      @create="$emit('create')"
      @edit="$emit('edit', $event)"
      @remove="$emit('remove', $event)"
      @view="$emit('view', $event)"
      @batch-deletion="$emit('batch-deletion', $event)"
    />
    <el-pagination
      v-model:currentPage="innerData.innerCurrentPage"
      class="manager-pagination"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="data?.length"
    />
    <DialogQuestionnaireDesigner
      v-model="uQuestionnaire"
      v-model:show="innerData.show"
      @close="$emit('close')"
      @save="save"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive, watch } from 'vue'
import ListQuestionnaire from './components/ListQuestionnaire/ListQuestionnaire.vue'
import OperateBar from './components/OperateBar/OperateBar.vue'
import DialogQuestionnaireDesigner from './components/DialogQuestionnaireDesigner/DialogQuestionnaireDesigner.vue'
import useQuestionnaireDesigner from './hooks/useQuestionnaireDesigner'
const { questionnaire: uQuestionnaire, getProcessedCopies } = useQuestionnaireDesigner()
defineExpose({ name: 'QuestionnaireManager' })
const props = defineProps({
  /**
   * 问卷数据
   */
  data: {
    type: Object as PropType<Questionnaire[]>,
    default: undefined
  },
  /**
   * 问卷
   */
  questionnaire: {
    type: Object as PropType<Questionnaire>,
    default: undefined
  },
  /**
   * 加载状态
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 保存问卷的方法
   */
  saveFunc: {
    type: Function as PropType<(data: Questionnaire) => void>,
    default: undefined
  },
  /**
   * 编辑弹窗显隐控制
   */
  showDialog: {
    type: Boolean,
    default: false
  },
  /**
   * 当前页
   */
  currentPage: {
    type: Number,
    default: 1
  },
  /**
   * 页数
   */
  pageSize: {
    type: Number,
    default: 10
  }
})

const innerData: QuestionnaireManagerData = reactive({
  innerCurrentPage: 1,
  show: false
})

const emit = defineEmits([
  'update:currentPage',
  'update:showDialog',
  'reload',
  'query',
  'edit',
  'create',
  'remove',
  'view',
  'batch-deletion',
  'close'
])

watch(
  [() => props.questionnaire, () => props.showDialog, () => props.currentPage],
  ([questionnaire, showDialog, currentPage]) => {
    uQuestionnaire.value = questionnaire
    innerData.innerCurrentPage = currentPage
    innerData.show = showDialog
  },
  { immediate: true, deep: true }
)

watch(
  () => innerData.innerCurrentPage,
  (newValue) => {
    emit('update:currentPage', newValue)
  }
)

watch(() => innerData.show,
  (newValue) => {
    emit('update:showDialog', newValue)
  }
)

/**
 * 保存按钮点击,返回一个处理过的数据
 */
function save() {
  if (props.saveFunc && uQuestionnaire.value) {
    const copy = getProcessedCopies()
    if (!copy) {
      return
    }
    props.saveFunc(copy)
  }
  innerData.show = false
}

</script>

<style lang="scss" scoped>
.manager-container {
  margin-top: 10px;
  background: white;
}

.manager-pagination {
  float: right;
  margin: 10px;
}
</style>
