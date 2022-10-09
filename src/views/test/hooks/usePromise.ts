import { Ref, ref, computed, watch, unref, ComputedRef } from 'vue-demi'

type Refable<T> = Ref<T> | T

export function usePromise<T = unknown> (
  promise: Refable<Promise<T> | null | undefined>
) {
  // 是否有错
  const isRejected = ref(false)
  // 是否成功
  const isResolved = ref(false)
  // 是否处于调用（等待）状态
  const isPending = computed(() => !isRejected.value && !isResolved.value)
  // 异常错误
  const error = ref<Error | undefined | null>()
  // promise被解决的data
  const data = ref<T | null | undefined>()
  // 使用watch监听promise，实时向上发送状态
  watch(
    () => unref(promise),
    (newPromise) => {
      isRejected.value = false
      isResolved.value = false
      error.value = null
      newPromise?.then(newData => {
        data.value = newData
        isResolved.value = true
      }, err => {
        error.value = err
        isRejected.value = true
      })
    },
    {
      immediate: true
    }
  )
  return {
    isRejected, isResolved, isPending, error, data
  }
}

// promiseState接口定义
export interface UsePromiseResult<T = unknown> {
  isPending: ComputedRef<boolean>
  isResolved: Ref<boolean>
  isRejected: Ref<boolean>
  error: Ref<Error | undefined | null>
  data: Ref<T | undefined | null>
}