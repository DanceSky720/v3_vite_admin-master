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
    <QuestionnaireDesigner
      v-model="questionnaireList.data[active]"
      class="preview"
      preview
    />
    <DialogQuestionnaireDesigner
      v-model="questionnaire.data"
      v-model:show="show"
      :questionnaire-type="questionnaireType"
      @close="close"
      @save="save"
    />
  </div>
</template>

<script setup lang="ts">
import DialogQuestionnaireDesigner from './DialogQuestionnaireEdit/DialogQuestionnaireDesigner.vue'
import QuestionnaireDesigner from './QuestionnaireDesigner/QuestionnaireDesigner.vue'
import { QuestionnaireStatus } from '../../entity/enum/QuestionnaireStatus.entity'
import ListQuestionnaire from './ListQuestionnaire/ListQuestionnaire.vue'
import { PropType, reactive, ref, watch } from 'vue'
import OperateBar from './OperateBar/OperateBar.vue'
import { cloneDeep } from 'lodash-es'

const props = defineProps({
  /**
   * 问卷数据
   */
  data: {
    type: Object as PropType<Questionnaire[]>,
    default: undefined,
  },
  /**
   * 保存问卷的方法
   */
  saveFunc: {
    type: Function as PropType<(data: Questionnaire) => void>,
    default: null,
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
    if (data) {
      questionnaireList.data = cloneDeep(data)
      questionnaire.data = questionnaireList.data[0]
    }
    innerCurrentPage.value = currentPage
  },
  { immediate: true, deep: true }
)

watch(innerCurrentPage, (newValue) => {
  emit('update:currentPage', newValue)
})

/**
 * 编辑按钮点击事件
 */
function edit(index: number) {
  active.value = index
  questionnaire.data = questionnaireList.data[active.value]
  show.value = true
}
/**
 * 重置组件数据
 */
function reborn() {
  questionnaire.data = {
    id: undefined,
    title: undefined,
    details: undefined,
    totalScore: undefined,
    isEnable: QuestionnaireStatus.ALIVE, // 默认启用
    createDate: undefined,
    lastUpdateUserName: undefined,
    lastUpdateDate: undefined,
    type: undefined,
    subjectList: [],
  }
}
/**
 * 创建空问卷
 */
function createQuestionnaire() {
  reborn()
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
  reborn()
  active.value = 0
  emit('reload')
}
</script>

<style lang="scss" scoped>
.manager-container {
  display: flex;
  margin-top: 10px;
  background: white;

  .left {
    position: relative;
    display: flex;
    flex: 2;
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
