<template>
  <div class="manager-container">
    <div class="left">
      <OperateBar
        @create="createQuestionnaire"
        @reload="$emit('reload')"
        @query="$emit('query', $event)"
      />
      <ListQuestionnaire
        :data="innerData.questionnaireList"
        @edit="edit"
        @view="innerData.active = $event"
      />
      <el-pagination
        v-model:currentPage="innerData.innerCurrentPage"
        class="manager-pagination"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="innerData.questionnaireList.length"
      />
    </div>
    <QuestionnaireDesigner
      v-model="innerData.questionnaireList[innerData.active]"
      class="preview"
      preview
    />
    <DialogQuestionnaireDesigner
      v-model="innerData.questionnaire"
      v-model:show="innerData.show"
      :questionnaire-type="questionnaireType"
      @close="close"
      @save="save"
    />
  </div>
</template>

<script setup lang="ts">
import DialogQuestionnaireDesigner from './DialogQuestionnaireDesigner/DialogQuestionnaireDesigner.vue'
import QuestionnaireDesigner from './QuestionnaireDesigner/QuestionnaireDesigner.vue'
import { QuestionnaireStatus } from '../../entity/enum/QuestionnaireStatus.entity'
import ListQuestionnaire from './ListQuestionnaire/ListQuestionnaire.vue'
import { PropType, reactive, watch } from 'vue'
import OperateBar from './OperateBar/OperateBar.vue'
import { cloneDeep } from 'lodash-es'

const props = defineProps({
  /**
   * 问卷数据
   */
  data: {
    type: Object as PropType<Questionnaire[]>,
    default: undefined
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

const innerData: QuestionnaireManagerData = reactive({
  active: 0,
  innerCurrentPage: 1,
  show: false,
  questionnaireList: [],
  questionnaire: undefined
})

const emit = defineEmits(['update:currentPage', 'reload', 'query'])

watch(
  [() => props.data, () => props.currentPage],
  ([data, currentPage]) => {
    if (data) {
      innerData.questionnaireList = data
      innerData.questionnaire = cloneDeep(innerData.questionnaireList[0])
    }
    innerData.innerCurrentPage = currentPage
  },
  { immediate: true, deep: true }
)

watch(() => innerData.innerCurrentPage,
  (newValue) => {
    emit('update:currentPage', newValue)
  }
)

/**
 * 编辑按钮点击事件
 */
function edit(index: number) {
  innerData.active = index
  innerData.questionnaire = cloneDeep(innerData.questionnaireList[index])
  innerData.show = true
}
/**
 * 重置组件数据
 */
function reborn() {
  innerData.questionnaire = {
    id: undefined,
    title: undefined,
    details: undefined,
    totalScore: undefined,
    isEnable: QuestionnaireStatus.ALIVE, // 默认启用
    createDate: undefined,
    lastUpdateUserName: undefined,
    lastUpdateDate: undefined,
    type: undefined,
    subjectList: []
  }
}
/**
 * 创建空问卷
 */
function createQuestionnaire() {
  reborn()
  innerData.show = true
}
/**
 * 保存按钮点击
 */
function save() {
  if(innerData.questionnaire){
    props.saveFunc(innerData.questionnaire)
  }
  innerData.show = false
}
/**
 * 编辑弹窗关闭
 */
function close() {
  innerData.show = false
  innerData.active = 0
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
