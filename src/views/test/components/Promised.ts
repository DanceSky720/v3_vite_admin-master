
import { 
  defineComponent,
  PropType,
  toRefs,
  reactive
} from 'vue-demi'

import { usePromise, UsePromiseResult } from '../hooks/usePromise'

export const MyPromised = defineComponent({
  name: 'MyPromised',
  props: {
    // 接受一个用户传入的promise  
    promise: {} as PropType<Promise<unknown> | null | undefined>,
  },
  setup(props, {slots}) {
    // 将props变成ref对象
    const propsAsRefs = toRefs(props)
    // 得到promise的状态
    const promiseState = reactive<UsePromiseResult>(
      usePromise(propsAsRefs.promise)
    )
    return () => {
      // 根据promiseState展示相应的视图
      const [slotName, slotData] = promiseState.isRejected
      ? ['rejected', promiseState.error]
      : !promiseState.isPending 
      ? ['default', promiseState.data]
      : ['pending', promiseState.data]
      return slots[slotName]!(slotData)
    }
  },
})
