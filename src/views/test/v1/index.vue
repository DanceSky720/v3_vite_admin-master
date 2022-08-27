<template>
  <div class="container">
    <div>{{ data.text }}</div>
    <div>{{ value }}</div>
  </div>
</template>

<script setup lang='ts' name='V1Test'>
import { reactive, ref, toRefs, watch } from 'vue'
console.error('如果该组件已有名字  ↖,则将我删除')

/**
 * XX的data类型
 */
type dataType = {
  /**
   * 注释
   */
  text: string
} 

const value = ref('this is a message')
const data: dataType = reactive({
  text: 'hello setup'
})

</script>

<style lang="scss" scoped>
.container {
  background: #fff;
}
</style>
