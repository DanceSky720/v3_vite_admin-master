/**
 * 问卷模板
 */
declare interface Questionnaire {
  /**
   * 唯一标识
   */
  id?: string
  /**
   * 标题
   */
  title: string
  /**
   * 详情
   */
  details: string
  /**
   * 问卷类型
   */
  type: string
  /**
   * 项目列表
   */
  subjectList: QuestionnaireSubject[]
}
