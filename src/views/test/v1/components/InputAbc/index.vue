<template>
  <div class="container">
    <p>组件: {{ value }}</p>
  <input v-model="value" />
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { reactive, ref, watch } from 'vue'
import useModel from '@/views/test/v1/components/InputAbc/useModel'

defineExpose({name:''})
const props = defineProps({
  /**
   * 属性
   */
  modelValue: {
    type: String,
    required: true
  }
})

const um = useModel()



const value = ref('this is a message')


const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (newValue) => {
  value.value = newValue
}, { immediate: true, deep: true })

watch(value, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
}
</style>
