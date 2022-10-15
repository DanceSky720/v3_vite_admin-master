<template>
  <div class="manager-container">
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
      @close="close"
      @save="save"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive, watch } from 'vue'
import ListQuestionnaire from './components/ListQuestionnaire/ListQuestionnaire.vue'
import OperateBar from './components/OperateBar/OperateBar.vue'
import DialogQuestionnaireDesigner from './components/DialogQuestionnaireDesigner/DialogQuestionnaireDesigner.vue'
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

const emit = defineEmits(['update:currentPage', 'update:showDialog', 'reload', 'query', 'edit', 'create', 'remove', 'view'])

watch(
  [() => props.questionnaire, () => props.showDialog, () => props.currentPage],
  ([questionnaire, showDialog, currentPage]) => {
    innerData.questionnaire = questionnaire
    innerData.innerCurrentPage = currentPage
    innerData.show = showDialog
  },
  { immediate: true, deep: true }
)

watch(() => innerData.innerCurrentPage,
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
    props.saveFunc(innerData.questionnaire)
  }
  innerData.show = false
}
/**
 * 编辑弹窗关闭
 */
function close() {
  innerData.show = false
  emit('reload')
}
/**
 * 返回一个被删除特定属性的实体
 * @param source 源目标
 * @param prop 属性
 */
function removeProperties<T>(source: object, prop: string): T {
  const sourceList = Object.entries(source)
  return Object.fromEntries(sourceList.map((item: [string, any], index: number) => {
    return item[0] === prop ? sourceList[index - 1] ?? sourceList[index + 1] : item
  })) as T
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
