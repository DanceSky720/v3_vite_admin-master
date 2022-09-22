<template>
  <div class="container">
    <Draw></Draw>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from 'vue'
import Draw from './components/draw/index.vue';

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100vh - 105px - 32px);
  min-height: calc(90vh - 105px - 32px);
  background: white;
}

.manager {
  box-sizing: border-box;
  width: 100%;
}
</style>
