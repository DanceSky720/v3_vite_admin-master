<template>
  <div class="container" >

    <DialogFollow v-model="value"/>
    <el-button @click="value = true">  open  </el-button>
    <el-button @click="value = true">  open  </el-button>
    <el-button @click="value = true">  open  </el-button>
    <el-button @click="value = true">  open  </el-button>
    <el-button @click="value = true">  open  </el-button>
    <el-button @click="value = true">  open  </el-button>
    <el-button @click="value = true">  open  </el-button>
  </div>
</template>

<script setup lang="ts" name="V1Test">
import { reactive, ref, toRefs, watch } from 'vue'
import useVisible from './hook/useVisible'
import DialogFollow from './components/DialogFollow/DialogFollow.vue'
const value = ref(false)
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 105px - 32px);
  background: white;
}
.tss {
  width: 100%;
  height: calc(200vh);
}
</style>
