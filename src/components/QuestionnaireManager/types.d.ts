/**
 * QuestionnaireManagerData组件的data类型
 */
type QuestionnaireManagerData = {
  /**
   * 显隐控制
   */
  show: boolean
  /**
   * 激活的下标
   */
  active: number
  /**
   * 当前页
   */
  innerCurrentPage: number
  /**
   * 问卷列表
   */
  questionnaireList: Questionnaire[]
  /**
   * 问卷
   */
  questionnaire: Questionnaire | undefined
}
