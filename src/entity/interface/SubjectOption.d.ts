/**
 * 题目选项
 */
declare interface SubjectOption {
  /**
   * id
   */
  id?: string | undefined
  /**
   * 题目id
   */
  subjectId: string
  /**
   * 选项名称
   */
  title: string
  /**
   * 选项序号
   */
  sort: number
  /**
   * 说明
   */
  description?: string | undefined
}
