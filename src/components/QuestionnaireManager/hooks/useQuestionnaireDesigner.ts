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
  const downward = (index: number) => {
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
  const remove = (index: number) => {
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
   * 1. 不同的题目标题
   * 2. 所有标题有内容
   * 3. 所有选择型数组拥有两个选项
   * 4. 所有选项标题非空
   * 5. 题目数大于一个
   * 6. 问卷标题非空
   */
  const allow = computed(() => {
    if (questionnaire.value) {
      const checkArray = [
        hasUniqueTitle(questionnaire.value.subjectList),
        emptyTitle(questionnaire.value.subjectList),
        allChoose(questionnaire.value.subjectList),
        hasNotEmptyOptionTitle(questionnaire.value.subjectList),
        questionnaire.value.subjectList.length > 0,
        questionnaire.value.title.length > 0
      ] 
      return checkArray.every(Boolean)
    }
    return false
  })
  /**
   * 获取题目类型的翻译
   * @param type 题目类型
   */
  const subjectType = (type: QuestionnaireSupportType) =>  types.get(type)
  
  /**
   * 是否拥有相同的标题
   * @param list 要检查的数组
   */
  const hasUniqueTitle = (list: QuestionnaireSubject[]) => {
    return new Set(list.map((subject: QuestionnaireSubject) => subject?.title)
      ).size === list.length
  }
  /**
   * 是否有空标题
   * @param list 要检查的数组
   */
  const emptyTitle = (list: QuestionnaireSubject[]) => {
    return list.every(
      (subject: QuestionnaireSubject) => subject?.title?.length
    )
  }
  /**
   * 所有选择型题目是否有两个选项
   * @param list 要检查的数组
   */
  const allChoose = (list: QuestionnaireSubject[]) => {
    return list.every((subject: QuestionnaireSubject) =>
      selective(subject.type) ? subject.options.length > 1 : true
    )
  }

  /**
   * 所有选项的标题是否有内容
   * @param list 要检查的数组
   */
  const hasNotEmptyOptionTitle = (list: QuestionnaireSubject[]) => {
    return list.every((subject: QuestionnaireSubject) => {
      return  subject.options.every((option: SubjectOption) =>
        option.title.length > 0
      )
    })
  }
  
  /**
   * 是否是选择型
   * @param type 题目类型
   */
  const selective = (type: QuestionnaireSupportType) =>
    [QuestionnaireSupportType.CHECKBOX, QuestionnaireSupportType.RADIO].includes(type)

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
