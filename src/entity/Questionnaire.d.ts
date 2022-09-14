/**
 * 问卷模板
 */
declare interface Questionnaire {
  /**
   * 唯一标识
   */
  id: string | undefined
  /**
   * 标题
   */
  title: string | undefined
  /**
   * 详情
   */
  details: string | undefined
  /**
   * 总分
   */
  totalScore: number | undefined
  /**
   * 是否启用
   */
  isEnable: number | undefined
  /**
   * 创建时间
   */
  createDate: string | undefined
  /**
   * 最后修改者
   */
  lastUpdateUserName: string | undefined
  /**
   * 最后修改时间
   */
  lastUpdateDate: string | undefined
  /**
   * 问卷类型
   */
  type: string | undefined
  /**
   * 项目列表
   */
  subjectList: QuestionnaireSubject[]
}
