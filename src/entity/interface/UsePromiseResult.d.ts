/**
 * UsePromise返回的结果类型
 */
declare interface UsePromiseResult<T> {
  /**
   * 是否在处理中
   */
  isPending: ComputedRef<boolean>
  /**
   * 是否已成功
   */
  isResolved: Ref<boolean>
  /**
   * 是否已失败
   */
  isRejected: Ref<boolean>
  /**
   * 错误信息
   */
  error: Ref<Error | undefined | null>
  /**
   * 成功信息
   */
  data: Ref<T | undefined | null>
}
