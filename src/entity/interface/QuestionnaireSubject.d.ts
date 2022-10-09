/**
 * 问卷项目
 */
declare interface QuestionnaireSubject {
  /**
   * 题目ID
   */
  id: string | undefined
  /**
   * 题目标题
   */
  title: string | undefined
  /**
   * 序号
   */
  serialNumber: number | undefined
  /**
   * 题目类型
   */
  type: string | undefined
  /**
   * 选项
   */
  options: SubjectOption[]
}
