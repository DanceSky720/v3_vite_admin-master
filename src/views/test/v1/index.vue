<template>
  <div class="container">
    <p>父: {{ a }}</p>
    <InputAbc v-model="a"/>
  </div>
</template>

<script setup lang="ts" name="V1Test">
import { reactive, ref, toRefs, watch } from "vue";
import InputAbc from "./components/InputAbc/index.vue";
const a = ref('')
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
