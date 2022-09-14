<template>
  <div class="container">
    <transition-group name="drag" class="list" tag="div">
      <li
        @dragstart="dragstart(index)"
        draggable="true"
        v-for="(item, index) in list"
        :key="item.label"
        class="list-item"
      >
        {{ item.label }}
      </li>
    </transition-group>
    <transition-group name="drag" class="list" tag="div">
      <li
        @dragstart="dragstart1(index)"
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        draggable="true"
        defaultPrevented="true"
        v-for="(item, index) in list1"
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

const list1 = reactive([{ label: '列表1' }])

function dragstart(index) {
  dragIndex.value = index
  is2.value = false
}

function dragstart1(index) {
  dragIndex1.value = index
  is2.value = true
}

function dragenter(e: DragEvent, index) {
 // console.log(e.dataTransfer?.setData('hello','value'));
  
  e.preventDefault()
  // 避免源对象触发自身的dragenter事件
  if (dragIndex.value !== index) {
    const source = is2 ? list[dragIndex.value] : list1[dragIndex.value]
    list1.splice(this.dragIndex, 1)
    list1.splice(index, 0, source)
    // 排序变化后目标对象的索引变成源对象的索引
    this.dragIndex = index
  }
}
function dragover(e: DragEvent, index) {
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
  height: 250px;
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
