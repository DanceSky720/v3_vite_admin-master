/**
 * DialogQuestionnaireDesignerData组件的data类型
 */
type DialogQuestionnaireDesignerData = {
  /**
   * 问卷
   */
  questionnaire: questionnaire | undefined
  /**
   * 显隐控制
   */
  open: boolean
  /**
   * 拖拽的题目类型
   */
  dancer: string
  /**
   * 当前编辑的下标
   */
  currentIndex: number
}
