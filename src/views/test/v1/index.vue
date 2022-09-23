<template>
  <div class="container">
    <PanelTopicDesigner v-model="data.data"></PanelTopicDesigner>
  </div>
</template>

<script setup lang="ts" name="V1Test">
import util from './util'
import { reactive, ref, toRefs, watch } from 'vue'
import PanelTopicDesigner from './components/PanelTopicDesigner/PanelTopicDesigner.vue';

const data = reactive({
  data: {
    id: '1522060322725523457',
    title: '这是单选题',
    serialNumber: 2,
    type: 'radio',
    options: [
      {
        title: '选项1',
        serialNumber: '',
        explain: '',
        fraction: 10,
      },
      {
        title: '选项2',
        serialNumber: '',
        explain: '',
        fraction: 0,
      },
      {
        title: '选项3',
        serialNumber: '',
        explain: '',
        fraction: 0,
      },
      {
        title: '选项4',
        serialNumber: '',
        explain: '',
        fraction: 0,
      },
    ],
  },
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100vh - 105px - 32px);
  background: white;
}
</style>
