import { computed, reactive } from 'vue'
import { QuestionnaireSupportType } from '../../entity/enum/QuestionnaireSupportType.entity'
import util from './util'

function useQuestionnaireDesigner() {
  const questionnaire = reactive({
    data: {} as Questionnaire | undefined,
  })
  /**
   * 上移题目
   * @param index 要下移的元素下标
   */
  const upwards = (index: number) => {
    questionnaire.data.subjectList = util.upwards<QuestionnaireSubject>(
      questionnaire.data.subjectList,
      index
    )
  }
  /**
   * 下移题目
   * @param index 要下移的元素下标
   */
  function downward(index: number) {
    questionnaire.data.subjectList = util.downward<QuestionnaireSubject>(
      questionnaire.data.subjectList,
      index
    )
  }
  /**
   * 移除题目
   * @param index 要移除的元素下标
   */
  function remove(index: number) {
    questionnaire.data.subjectList.splice(index, 1)
  }
  /**
   * 是否允许点击保存按钮
   */
  const allow = computed(() => {
    const checkArray = [
      hasUniqueTitle(questionnaire.data.subjectList),
      emptyTitle(questionnaire.data.subjectList),
      questionnaire.data.subjectList.length > 0,
      questionnaire.data.title ? questionnaire.data.title.length > 0 : false,
      questionnaire.data.type ? questionnaire.data.type.length > 0 : false,
    ]
    return checkArray.every((pass: boolean) => pass)
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
  function hasUniqueTitle(list: QuestionnaireSubject[]) {
    return (
      new Set(list.map((subject: QuestionnaireSubject) => subject.title))
        .size === list.length
    )
  }
  /**
   * 是否有空标题
   * @param list 要检查的数组
   */
  function emptyTitle(list: QuestionnaireSubject[]) {
    return list.every((subject: QuestionnaireSubject) => subject.title?.length)
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
