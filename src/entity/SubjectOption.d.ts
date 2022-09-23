/**
 * 题目选项
 */
declare interface SubjectOption {
  /**
   * id
   */
   id?: string | undefined
  /**
   * 选项名称
   */
  title: string | undefined
  /**
   * 选项序号
   */
  serialNumber: string | undefined
  /**
   * 说明
   */
  explain: string | undefined
  /**
   * 分数
   */
  fraction: number | undefined
}
