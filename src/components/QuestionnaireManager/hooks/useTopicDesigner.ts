import { QuestionnaireSupportType } from '@/entity/enum/QuestionnaireSupportType.entity'
import { computed, ref } from 'vue'
import util from '../util'

function useTopicDesigner() {
  /**
   * 问卷选项
   */
  const questionnaireSubject = ref<QuestionnaireSubject | undefined>()
  /**
   * 上移选项
   * @param index 要上移的元素下标
   */
  function upwards(index: number) {
    if (questionnaireSubject.value) {
      questionnaireSubject.value.options = util.upwards<SubjectOption>(
        questionnaireSubject.value.options,
        index
      )
    }
  }

  /**
   * 下移选项
   * @param index 要下移的元素下标
   */
  function downward(index: number) {
    if (questionnaireSubject.value) {
      questionnaireSubject.value.options = util.downward<SubjectOption>(
        questionnaireSubject.value.options,
        index
      )
    }
  }

  /**
   * 移除选项
   * @param index 要移除的元素下标
   */
  function remove(index: number) {
    if (!questionnaireSubject.value) {
      return
    }
    questionnaireSubject.value.options = util.remove<SubjectOption>(
      questionnaireSubject.value.options,
      index
    )
  }

  /**
   * 拖拽进入时,交换值
   * @param index 交换的元素下标
   * @param index1 交换的元素下标1
   */
  function exchangeValue(index: number, index1: number) {
    if (index1 === index) {
      return
    }
    if (!questionnaireSubject.value) {
      return
    }
    questionnaireSubject.value.options = util.swapPlaces(
      questionnaireSubject.value.options,
      index,
      index1
    )
  }

  /**
   * 是否是选择型
   */
  const selective = computed(() => {
    return questionnaireSubject.value
      ? [
          QuestionnaireSupportType.CHECKBOX,
          QuestionnaireSupportType.RADIO
        ].includes(questionnaireSubject.value.type)
      : false
  })

  /**
   * 是否允许添加新的选项
   */
  const allow = computed(() => {
    if (questionnaireSubject.value) {
      const hasTitle = questionnaireSubject.value.options.every(
        (option: SubjectOption) => option.title !== ''
      )
      return [hasTitle, questionnaireSubject.value.options.length < 4].every(Boolean)
    }
    return false
  })

  return {
    questionnaireSubject,
    upwards,
    downward,
    remove,
    exchangeValue,
    selective,
    allow
  }
}

export default useTopicDesigner
