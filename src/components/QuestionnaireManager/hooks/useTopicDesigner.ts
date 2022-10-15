import { QuestionnaireSupportType } from '@/entity/enum/QuestionnaireSupportType.entity'
import { computed, reactive, ref } from 'vue'
import util from '../util'

function useTopicDesigner() {
  const questionnaireSubject = ref<QuestionnaireSubject | undefined | null>()
  /**
   * 上移选项
   * @param index 要上移的元素下标
   */
  function upwards(index: number) {
    questionnaireSubject.value.options = util.upwards<SubjectOption>(
      questionnaireSubject.value.options,
      index
    )
  }

  /**
   * 下移选项
   * @param index 要下移的元素下标
   */
  function downward(index: number) {
    questionnaireSubject.value.options = util.downward<SubjectOption>(
      questionnaireSubject.value.options,
      index
    )
  }

  /**
   * 添加选项
   */
  function addOption() {
    questionnaireSubject.value.options.push({
      id: new Date().getTime().toString(), //只在创建时使用 
      title: '',
      serialNumber: undefined,
      explain: undefined,
      fraction: undefined,
    })
  }

  /**
   * 移除选项
   * @param index 要移除的元素下标
   */
  function remove(index: number) {
    questionnaireSubject.value.options = util.remove<SubjectOption>(questionnaireSubject.value.options, index)
  }

  /**
   * 是否是选择型
   */
  const selective = computed(() => {
    if (questionnaireSubject) {
      return (
        questionnaireSubject?.value?.type ===
          QuestionnaireSupportType.CHECKBOX ||
        questionnaireSubject?.value?.type === QuestionnaireSupportType.RADIO
      )
    }
  })

  /**
   * 是否允许添加新的选项
   */
  const allow = computed(() => {
    const hasTitle = questionnaireSubject.value.options.every(
      (option: SubjectOption) => option.title !== ''
    )
    return [
      hasTitle,
      questionnaireSubject.value.options.length < 4,
    ].every((pass: boolean) => pass)
  })

  return {
    questionnaireSubject,
    upwards,
    downward,
    addOption,
    remove,
    selective,
    allow
  }
}

export default useTopicDesigner
