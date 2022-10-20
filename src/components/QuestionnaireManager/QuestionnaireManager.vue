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
      v-model="innerData.questionnaire"
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
import util from './util'
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
  loading:{
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
  show: false,
  questionnaire: undefined
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
    innerData.questionnaire = questionnaire
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
 * 保存按钮点击
 */
function save() {
  if (props.saveFunc && innerData.questionnaire) {
    const copy = util.deepCopy(innerData.questionnaire)
    // 删除之前用作key的id并且添加sort排序
    copy.subjectList = copy.subjectList.map((subject: QuestionnaireSubject, index: number) => {
      subject.id = undefined
      subject.sort = index
      subject.options = subject.options.map((option: SubjectOption, i: number) => {
        option.id = undefined
        option.sort = i
        return option
      })
      return subject
    })
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
