<template>
  <div
    class="async-management-container"
    :class="center ? 'let-me-center' : ''"
  >
    <slot
      v-if="isPending"
      name="pending"
    >
    </slot>
    <slot
      v-if="isResolved"
      name="default"
      :data="data"
    />
    <slot
      v-if="isRejected"
      name="rejected"
      :error="error"
    >
    </slot>
  </div>
</template>

<script setup lang="ts">
import { usePromise } from './usePromise'
import { PropType } from 'vue'
const props = defineProps({
  /**
   * 异步函数
   */
  promise: {
    type: Object as PropType<Promise<unknown> | null | undefined>,
    required: true
  },
  /**
   * 是否居中布局
   */
  center: {
    type: Boolean,
    default: true
  }
})

const { isRejected, isResolved, isPending, data, error } =
  usePromise(props.promise)
</script>

<style scoped>
.async-management-container {
  box-sizing: border-box;
  height: 100%;
  padding: 0;
  margin: 0;
}

.let-me-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
