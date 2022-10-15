/**
 * 题目选项编辑版本
 */
declare interface SubjectOptionEditorialVersion {
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
  /**
   * 排序id
   */
   rid?: number | undefined
}
