<template>
  <div class="container">
    <p>isRejected: {{ isRejected }}</p>
    <p>isResolved: {{ isResolved }}</p>
    <p>isPending: {{ isPending }}</p>
    <p>error: {{ error?.message }}</p>
    <p>data: {{ data }}</p>
    <AsyncManagement :promise="np2()">
      <template #pending> padding</template>
      <template #default="scope"> resolved: {{ scope.data }} </template>
      <template #rejected> rejected </template>
    </AsyncManagement>
    <DynamicHeading  title="qwe"></DynamicHeading>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from 'vue'
import { usePromise } from '../components/AsyncManagement/usePromise'
import AsyncManagement from '../components/AsyncManagement/AsyncManagement.vue'
import DynamicHeading from '../components/AsyncManagement/Func'
const { isRejected, isResolved, isPending, error, data } = usePromise(
  np1()
)

async function np1() {
  await ps()
  return 1
}
async function np2() {
 return new Promise((resolve,reject)=>{
  setTimeout(() => {
      resolve('hello')
    }, 1000)
 })
}

async function ps() {
  return new Promise((resolved, rejected) => {
    setTimeout(() => {
      resolved('hello')
    }, 3000)
  })
}
</script>

<style lang="scss" scoped>
.container {
  background: white;
}

.manager {
}
</style>
