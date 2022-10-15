import { computed, ref } from 'vue'
import { QuestionnaireSupportType } from '@/entity/enum/QuestionnaireSupportType.entity'
import util from '../util'

function useQuestionnaireDesigner() {
  const questionnaire = ref<QuestionnaireEditorialVersion | undefined | null>()
  /**
   * 上移题目
   * @param index 要下移的元素下标
   */
  const upwards = (index: number) => {
    questionnaire.value.subjectList = util.upwards<QuestionnaireSubjectEditorialVersion>(
      questionnaire.value.subjectList,
      index
    )
  }
  /**
   * 下移题目
   * @param index 要下移的元素下标
   */
  function downward(index: number) {
    questionnaire.value.subjectList = util.downward<QuestionnaireSubjectEditorialVersion>(
      questionnaire.value.subjectList,
      index
    )
  }
  /**
   * 移除题目
   * @param index 要移除的元素下标
   */
  function remove(index: number) {
    questionnaire.value.subjectList = util.remove(questionnaire.value.subjectList, index)
  }
  /**
   * 是否允许点击保存按钮
   */
  const allow = computed(() => { 
    const checkArray = [
      hasUniqueTitle(questionnaire.value.subjectList),
      emptyTitle(questionnaire.value.subjectList),
      questionnaire.value.subjectList.length > 0,
      questionnaire.value.title ? questionnaire.value.title.length > 0 : false
    ]
    return checkArray.every(Boolean)
  })
  /**
   * 获取题目类型的翻译
   * @param type 题目类型
   */
  function subjectType(type: string | undefined) {
    if (type === QuestionnaireSupportType.CHECKBOX) {
      return '多选题'
    }
    if (type === QuestionnaireSupportType.RADIO) {
      return '单选题'
    }
    if (type === QuestionnaireSupportType.INPUT) {
      return '主观题'
    }
    return '未定义'
  }
  /**
   * 是否拥有相同的标题
   * @param list 要检查的数组
   */
  function hasUniqueTitle(list: QuestionnaireSubjectEditorialVersion[]) {
    return (
      new Set(list.map((subject: QuestionnaireSubjectEditorialVersion) => subject?.title))
        .size === list.length
    )
  }
  /**
   * 是否有空标题
   * @param list 要检查的数组
   */
  function emptyTitle(list: QuestionnaireSubjectEditorialVersion[]) {
    return list.every((subject: QuestionnaireSubjectEditorialVersion) => subject?.title?.length)
  }

  return {
    questionnaire,
    upwards,
    downward,
    remove,
    allow,
    subjectType
  }
}

export default useQuestionnaireDesigner
