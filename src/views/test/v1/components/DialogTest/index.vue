<template>
  <div class="dia"> {{ value }} </div>
</template>

<script setup lang='ts' name='DialogTest'>
import { reactive, ref, toRefs, watch } from 'vue'
const props = defineProps({
  /**
   * 属性
   */
   modelValue: {
    type: Boolean,
    required: true
  }
})

const value = ref(false)

const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (newValue) => {
  value.value = newValue
}, { immediate: true})

watch(value, (newValue) => {
  emit('update:modelValue',newValue)
})
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
}

.dia {
  width: 100px;
  height: 100px;
  background: #43A1FF;
}
</style>
