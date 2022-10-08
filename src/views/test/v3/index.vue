<template>
  <div class="container">
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from 'vue'

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
