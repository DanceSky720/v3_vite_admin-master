/**
 * 问卷项目基类
 */
declare interface QuestionnaireSubjectBase {
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
}
