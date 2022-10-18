import { computed, ref } from 'vue'
import { QuestionnaireSupportType } from '@/entity/enum/QuestionnaireSupportType.entity'
import util from '../util'

function useQuestionnaireDesigner() {
  /**
   * 问卷
   */
  const questionnaire = ref<Questionnaire | undefined>()
  const types = new Map<QuestionnaireSupportType, string>()
  types.set(QuestionnaireSupportType.CHECKBOX, '多选题')
  types.set(QuestionnaireSupportType.RADIO, '单选题')
  types.set(QuestionnaireSupportType.INPUT, '填空题')
  /**
   * 上移题目
   * @param index 要下移的元素下标
   */
  const upwards = (index: number) => {
    if (questionnaire.value) {
      questionnaire.value.subjectList =
        util.upwards<QuestionnaireSubject>(
          questionnaire.value.subjectList,
          index
        )
    }
  }
  /**
   * 下移题目
   * @param index 要下移的元素下标
   */
  function downward(index: number) {
    if (questionnaire.value) {
      questionnaire.value.subjectList =
        util.downward<QuestionnaireSubject>(
          questionnaire?.value?.subjectList,
          index
        )
    }
  }
  /**
   * 移除题目
   * @param index 要移除的元素下标
   */
  function remove(index: number) {
    if (questionnaire.value) {
      questionnaire.value.subjectList =
        util.remove<QuestionnaireSubject>(
          questionnaire.value.subjectList,
          index
        )
    }
  }
  /**
   * 是否允许点击保存按钮
   */
  const allow = computed(() => {
    if (questionnaire.value) {
      const checkArray = [
        hasUniqueTitle(questionnaire.value.subjectList),
        emptyTitle(questionnaire.value.subjectList),
        questionnaire.value.subjectList.length > 0,
        questionnaire.value.title
          ? questionnaire.value.title.length > 0
          : false,
      ]
      return checkArray.every(Boolean)
    }
    return false
  })
  /**
   * 获取题目类型的翻译
   * @param type 题目类型
   */
  function subjectType(type: QuestionnaireSupportType) {
    return types.get(type)
  }
  /**
   * 是否拥有相同的标题
   * @param list 要检查的数组
   */
  function hasUniqueTitle(list: QuestionnaireSubject[]) {
    return (
      new Set(
        list.map(
          (subject: QuestionnaireSubject) => subject?.title
        )
      ).size === list.length
    )
  }
  /**
   * 是否有空标题
   * @param list 要检查的数组
   */
  function emptyTitle(list: QuestionnaireSubject[]) {
    return list.every(
      (subject: QuestionnaireSubject) => subject?.title?.length
    )
  }

  return {
    questionnaire,
    upwards,
    downward,
    remove,
    allow,
    subjectType,
  }
}

export default useQuestionnaireDesigner
