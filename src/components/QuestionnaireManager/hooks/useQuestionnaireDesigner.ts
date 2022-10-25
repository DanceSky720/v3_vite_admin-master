import { computed, ref } from 'vue'
import { QuestionnaireSupportType } from '@/entity/enum/QuestionnaireSupportType.entity'
import util from '../util'
const QUESTIONNAIRE = 'questionnaire'
/**
 * 问卷设计钩子
 */
function useQuestionnaireDesigner() {
  /**
   * 问卷
   */
  const questionnaire = ref<Questionnaire | undefined>()
  const types = new Map<QuestionnaireSupportType, string>()
    .set(QuestionnaireSupportType.CHECKBOX, '多选题')
    .set(QuestionnaireSupportType.RADIO, '单选题')
    .set(QuestionnaireSupportType.INPUT, '填空题')

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
   * 3. 所有选择型题目拥有两个选项
   * 4. 所有选项标题非空
   * 5. 题目数大于一个
   * 6. 问卷标题非空
   */
  const allow = computed(() => {
    if (!questionnaire.value) {
      return false
    }
    return [
      hasUniqueTitle(questionnaire.value.subjectList),
      emptyTitle(questionnaire.value.subjectList),
      allChoose(questionnaire.value.subjectList),
      hasNotEmptyOptionTitle(questionnaire.value.subjectList),
      questionnaire.value.subjectList.length > 0,
      questionnaire.value.title.length > 0
    ].every(Boolean)
  })
  /**
   * 获取题目类型的翻译
   * @param type 题目类型
   */
  const subjectType = (type: QuestionnaireSupportType) => types.get(type)

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
      return subject.options.every((option: SubjectOption) =>
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

  /**
   * 获取一个作用for列表的key
   * @returns 临时id
   */
  const temporaryKey = () => QUESTIONNAIRE + new Date().getTime().toString()

  /**
   * 是否创建的临时key,是就设置为undefined
   * @params id
   */
  const isMyKey = (id: string | undefined) => id?.search(QUESTIONNAIRE) !== -1 ? undefined : id

  /**
   * 获取一个处理过的拷贝
   * 1. 移除id
   * 2. 添加排序
   */
  const getProcessedCopies = () => {
    if (!questionnaire.value) {
      return
    }
    const copy = util.deepCopy(questionnaire.value)
    // 删除之前用作key的id并且添加sort排序
    copy.subjectList = copy.subjectList.map((subject: QuestionnaireSubject, index: number) => {
      subject.id = isMyKey(subject.id)
      subject.sort = index
      subject.options = subject.options.map((option: SubjectOption, i: number) => {
        option.id = isMyKey(option.id)
        option.sort = i
        return option
      })
      return subject
    })
    return copy
  }

  /**
   * 添加一个选项
   */
  const addOption = (index: number) => {
    if (!questionnaire.value) {
      return
    }
    questionnaire.value.subjectList[index].options.push({
      id: temporaryKey(), // 添加时作为列表的key使用,之后移除
      title: '',
      subjectId: '',
      sort: 0,
      description: undefined
    })
  }

  const addSubject = (type: QuestionnaireSupportType) => {
    if (!questionnaire.value) {
      return
    }
    questionnaire.value.subjectList.push({
      id: temporaryKey(), // 添加时作为列表的key使用
      templateId: '',
      title: '',
      sort: 0,
      type: type,
      options: [],
      optionIds: [],
      extend: ''
    })
  }
  /**
   * 重置问卷数据
   */
  const reborn = () => {
    questionnaire.value = {
      id: undefined,
      title: '',
      details: '',
      type: '',
      subjectList: []
    }
  }

  return {
    questionnaire,
    upwards,
    downward,
    remove,
    allow,
    subjectType,
    addSubject,
    reborn,
    getProcessedCopies,
    addOption
  }
}

export default useQuestionnaireDesigner
