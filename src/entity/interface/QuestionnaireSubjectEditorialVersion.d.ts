/**
 * 问卷项目编辑版本
 */
declare interface QuestionnaireSubjectEditorialVersion extends QuestionnaireSubjectBase {
  /**
   * 排序id
   */
   rid?: number | undefined
  /**
   * 选项
   */
  options: SubjectOptionEditorialVersion[]
}
