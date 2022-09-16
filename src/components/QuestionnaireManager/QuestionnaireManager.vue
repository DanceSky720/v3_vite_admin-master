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
        @view="view"
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
      v-model="questionnaireList.data[innerActive]"
      preview
    />
    <DialogQuestionnaireEdit
      v-model="questionnaireList.data[innerActive]"
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
   * 激活的下标
   */
  active: {
    type: Number,
    default: 0,
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
let innerActive = ref(0)
/**
 * 激活的下标
 */
let innerCurrentPage = ref(0)
/**
 * 显隐控制
 */
let show = ref(false)

const emit = defineEmits([
  'update:modelValue',
  'update:active',
  'update:currentPage',
  'reload',
  'query',
  'save',
])

watch(
  [() => props.modelValue, () => props.active, () => props.currentPage],
  ([modelValue, active, currentPage]) => {
    questionnaireList.data = modelValue
    innerActive.value = active
    innerCurrentPage.value = currentPage
  },
  { immediate: true, deep: true }
)

watch(questionnaireList.data, (newValue) => {
  emit('update:modelValue', newValue)
})
watch(innerActive, (newValue) => {
  emit('update:active', newValue)
})
watch(innerCurrentPage, (newValue) => {
  emit('update:currentPage', newValue)
})
/**
 * 编辑按钮点击事件
 */
function edit(index: number) {
  innerActive.value = index
  show.value = true
}
/**
 * 查看按钮点击事件
 */
function view(index: number) {
  innerActive.value = index
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
    innerActive.value = questionnaireList.data.length - 1
    show.value = true
  })
}
/**
 * 保存按钮点击
 */
function save() {
  show.value = false
  emit('save')
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
  align-items: flex-end;
  align-self: flex-end;
}
</style>
