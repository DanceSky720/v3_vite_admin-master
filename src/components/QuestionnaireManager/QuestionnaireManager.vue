<template>
  <div class="manager-container">
    <div class="left">
      <OperateBar
        @create="createQuestionnaire"
        @reload="$emit('reload')"
        @query="$emit('query', $event)"
      />
      <ListQuestionnaire
        :data="questionnaireList.data"
        @edit="edit"
        @view="active = $event"
      />
      <el-pagination
        class="manager-pagination"
        v-model:currentPage="innerCurrentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="questionnaireList.data.length"
      />
    </div>
    <PreviewOrEdit
      class="preview"
      v-model="questionnaireList.data[active]"
      preview
    />
    <DialogQuestionnaireEdit
      v-model="questionnaireList.data[active]"
      v-model:show="show"
      :questionnaire-type="questionnaireType"
      @close="close"
      @save="save"
    />
  </div>
</template>

<script setup lang="ts">
import DialogQuestionnaireEdit from './DialogQuestionnaireEdit/DialogQuestionnaireEdit.vue'
import ListQuestionnaire from './ListQuestionnaire/ListQuestionnaire.vue'
import PreviewOrEdit from './PreviewOrEdit/PreviewOrEdit.vue'
import { nextTick, PropType, reactive, ref, watch } from 'vue'
import OperateBar from './OperateBar/OperateBar.vue'

const props = defineProps({
  /**
   * 问卷数据
   */
  modelValue: {
    type: Object as PropType<Questionnaire[]>,
    default: null,
  },
  /**
   * 保存问卷的方法
   */
   saveFunc: {
    type: Function as PropType<(data: Questionnaire) => void>,
    default: null
  },
  /**
   * 当前页
   */
  currentPage: {
    type: Number,
    default: 1,
  },
  /**
   * 问卷类型数组
   */
  questionnaireType: {
    type: Array as PropType<questionnaireType[]>,
    default: [],
  },
  /**
   * 页数
   */
  pageSize: {
    type: Number,
    default: 10,
  },
})
/**
 * 问卷列表
 */
let questionnaireList = reactive({ data: [] as Questionnaire[] })
/**
 * 激活的下标
 */
let active = ref(0)
/**
 * 当前页
 */
let innerCurrentPage = ref(1)
/**
 * 显隐控制
 */
let show = ref(false)

let questionnaire = reactive({data: {} as Questionnaire})

const emit = defineEmits([
  'update:modelValue',
  'update:active',
  'update:currentPage',
  'reload',
  'query'
])

watch(
  [() => props.modelValue, () => props.currentPage],
  ([modelValue, currentPage]) => {
    questionnaireList.data = modelValue
    innerCurrentPage.value = currentPage
  },
  { immediate: true, deep: true }
)

watch(questionnaireList.data, (newValue) => {
  emit('update:modelValue', newValue)
})
watch(innerCurrentPage, (newValue) => {
  emit('update:currentPage', newValue)
})
/**
 * 编辑按钮点击事件
 */
function edit(index: number) {
  active.value = index
  show.value = true
}
/**
 * 编辑弹窗关闭
 */
function close() {
  show.value = false
  emit('reload')
}
/**
 * 创建空问卷
 */
function createQuestionnaire() {
  questionnaireList.data.push({
    id: undefined,
    title: undefined,
    details: undefined,
    totalScore: undefined,
    isEnable: 1, // 默认启用
    createDate: undefined,
    lastUpdateUserName: undefined,
    lastUpdateDate: undefined,
    type: undefined,
    subjectList: [],
  })
  nextTick(() => {
    active.value = questionnaireList.data.length - 1
    show.value = true
  })
}
/**
 * 保存按钮点击
 */
function save() {
  show.value = false
  props.saveFunc(questionnaireList.data[active.value])
}
</script>

<style lang="scss" scoped>

.manager-container {
  margin-top: 10px;
  display: flex;
  background: white;

  .left {
    position: relative;
    flex: 2;
    display: flex;
    flex-direction: column;
  }

  .preview {
    flex: 1;
  }
}

.manager-pagination {
  align-self: flex-end;
  margin: 10px;
}
</style>
