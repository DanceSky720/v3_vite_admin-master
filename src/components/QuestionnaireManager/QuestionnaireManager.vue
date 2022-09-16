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
        v-model:currentPage="innerCurrentPage"
        class="manager-pagination"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="questionnaireList.data.length"
      />
    </div>
    <PreviewOrEdit
      v-model="questionnaire.data"
      class="preview"
      preview
    />
    <DialogQuestionnaireEdit
      v-model="questionnaire.data"
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
import { PropType, reactive, ref, watch } from 'vue'
import OperateBar from './OperateBar/OperateBar.vue'
import { cloneDeep } from 'lodash-es'

const props = defineProps({
  /**
   * 问卷数据
   */
  data: {
    type: Object as PropType<Questionnaire[]>,
    default: null
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
    default: 1
  },
  /**
   * 问卷类型数组
   */
  questionnaireType: {
    type: Array as PropType<questionnaireType[]>,
    default: []
  },
  /**
   * 页数
   */
  pageSize: {
    type: Number,
    default: 10
  }
})
/**
 * 问卷列表
 */
const questionnaireList = reactive({ data: [] as Questionnaire[] })
/**
 * 激活的下标
 */
const active = ref(0)
/**
 * 当前页
 */
const innerCurrentPage = ref(1)
/**
 * 显隐控制
 */
const show = ref(false)
/**
 * 问卷
 */
const questionnaire = reactive({ data: {} as Questionnaire })

const emit = defineEmits(['update:currentPage', 'reload', 'query'])

watch(
  [() => props.data, () => props.currentPage],
  ([data, currentPage]) => {
    questionnaireList.data = cloneDeep(data)
    innerCurrentPage.value = currentPage
    questionnaire.data = questionnaireList.data[0]
  },
  { immediate: true, deep: true }
)

watch(innerCurrentPage, (newValue) => {
  emit('update:currentPage', newValue)
})

watch(active, (newValue) => {
  questionnaire.data = questionnaireList.data[newValue]
})
/**
 * 编辑按钮点击事件
 */
function edit(index: number) {
  active.value = index
  show.value = true
}
/**
 * 创建空问卷
 */
function createQuestionnaire() {
  questionnaire.data = {
    id: undefined,
    title: undefined,
    details: undefined,
    totalScore: undefined,
    isEnable: 1, // 默认启用
    createDate: undefined,
    lastUpdateUserName: undefined,
    lastUpdateDate: undefined,
    type: undefined,
    subjectList: []
  }
  show.value = true
}
/**
 * 保存按钮点击
 */
function save() {
  show.value = false
  props.saveFunc(questionnaire.data)
}
/**
 * 编辑弹窗关闭
 */
function close() {
  show.value = false
  active.value = 0
  emit('reload')
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
