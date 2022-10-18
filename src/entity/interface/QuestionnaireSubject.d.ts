/**
 * 问卷项目
 */
declare interface QuestionnaireSubject {
  /**
   * 题目ID
   */
  id?: string | undefined
  /**
   * 模板id
   */
  templateId: string
  /**
   * 题目标题
   */
  title: string
  /**
   * 序号
   */
  sort: number
  /**
   * 题目类型
   */
  type: QuestionnaireSupportType
  /**
   * 答案id 类型为填空题时传空数组
   */
  optionIds: string[]
  /**
   * 扩展字段
   */
  extend: string
  /**
   * 选项
   */
  options: SubjectOption[]
}
