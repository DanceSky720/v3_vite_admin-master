import { ref, computed, watch, unref } from 'vue'

/**
 * 返回一个Promise的状态
 * @param promise 异步函数
 */
export function usePromise<T>(
  promise: T
) : UsePromiseResult<T> {
  const isRejected = ref(false)
  const isResolved = ref(false)
  const isPending = computed(() => !isRejected.value && !isResolved.value)
  const errorInfo = ref<Error | undefined | null>()
  const data = ref<T | null | undefined>()
  watch(() => unref(promise),
    async(newPromise) => {
      isRejected.value = false
      isResolved.value = false
      errorInfo.value = null
      try {
        const res = await newPromise
        data.value = res
        isResolved.value = true
      } catch (error) {
        console.error(error)
        errorInfo.value = error as Error
        isRejected.value = true
      }
    }, { immediate: true }
  )
  return {
    isRejected, isResolved, isPending, error: errorInfo, data
  }
}
