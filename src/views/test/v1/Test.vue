<template>
  <div class="container">
    <transition-group name="drag" class="list" tag="div">
      <li
      @dragenter="dragenter($event, index)"
      @dragover="dragover($event)"
      @dragstart="dragIndex = index"
        draggable="true"
        v-for="(item, index) in list"
        :key="item.label"
        class="list-item"
      >
        {{ item.label }}
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts" name="Test">
import { reactive, ref } from 'vue'
const dragIndex = ref(0)
const dragIndex1 = ref(0)

const is2 = ref(false)

const list = reactive([
  { label: '列表1' },
  { label: '列表2' },
  { label: '列表3' },
  { label: '列表4' },
  { label: '列表5' },
  { label: '列表6' },
])

function dragstart(index) {
  dragIndex.value = index;
}


function dragenter(e: DragEvent, index) {
  if (dragIndex.value !== index) {
        const source = list[dragIndex.value];
        list.splice(dragIndex.value, 1);
        list.splice(index, 0, source);
        // 排序变化后目标对象的索引变成源对象的索引
        dragIndex.value = index;
      }

  
}
function dragover(e: DragEvent) {
  e.preventDefault()
 // console.log(e.dataTransfer?.getData('hello'));
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100vh - 105px - 32px);
  background: white;
}
.list {
  list-style: none;
  border: 1px solid #59bcea;
  .drag-move {
    transition: transform 0.3s;
  }
  .list-item {
    cursor: move;
    width: 300px;
    background: #ea6e59;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 6px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
