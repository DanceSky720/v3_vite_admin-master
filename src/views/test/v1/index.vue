<template>
  <div class="container">
   
  </div>
</template>

<script setup lang='ts' name='V1Test'>
import { useRouter } from 'vue-router'
import { reactive, ref, toRefs, watch } from 'vue'

const props = defineProps({

})

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

const emit = defineEmits(['update:modelValue'])

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100vh - 105px - 32px);
  background: white;
}
</style>
