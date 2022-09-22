<template>
  <div class="draw-container">

    <el-button
    v-for="(item, index) in supportedComponents.data"
    :key="item[0]"
    class="btn-selector"
    type="primary"
    draggable="true"
    @dragstart="dragstart($event,item[1])"
    @dragend="dragend($event)"
    plain
  >
    {{ item[0] }}
  </el-button>


    <div
      @dragenter="dragenter($event)"
      @dragover="$event.preventDefault()"
      @dragleave="dragleave($event)"
      class="div1"
    >
      <p   v-for="item,index in list.data" :key="index + item" :class="'p' + index">
       <span>{{ item }} </span>  
       <span>{{ item }} </span>  
       <span>{{ item }} </span>  
      </p>
      <!-- <div class="cover" v-if="dragValve"   @dragenter="dragenter($event)"
      @dragover="$event.preventDefault()"
      @dragleave="dragleave($event)"  /> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import { onMounted, reactive, ref, toRefs, watch } from 'vue'

const list = reactive({ data: [] as string[] })
const countRef = ref(0);
const supportedComponents = reactive({
  data: [
    ['单项选择', 'RADIO'],
    ['多项选择', 'CHECKBOX'],
  ],
})

const grasping = ref('')

const e1 = reactive({data: {}})

const dragValve = ref(false)

function dragstart(event: DragEvent,type: string) {
  grasping.value = type
}

function dragend(event: DragEvent) {
  console.log('dragend')
}
function dragenter(event: DragEvent) {
  event.stopPropagation();
  dragValve.value = true
  // event.stopImmediatePropagation()
  // event.target
  if('div1' === (event.currentTarget as HTMLElement).className){
   list.data.push(grasping.value)
  }else {
    event.stopImmediatePropagation()
  }
  console.log('dragenter', (event.currentTarget) === (event.target))
}
function dragleave(event: DragEvent) {
  if((event.target) === (event.currentTarget)){
 
  }
  console.log('dragleave', (event.currentTarget as HTMLElement).className, (event.target as HTMLElement).className)
  list.data.splice(list.data.length - 1, 1)
  dragValve.value = false
}
function dragenter1(event: DragEvent) {
  event.preventDefault()

}


function dragover(e: DragEvent) {
  e.preventDefault()
}
</script>

<style lang="scss" scoped>
.draw-container {
  background: #fff;
}

.btn1 {
  top: 0;
  left: 0;
  width: 100px;
  height: 60px;
  cursor: move;
  z-index: 1;
  transition: all 1s;
}

.btn2 {
  top: 170;
  left: 0;
  width: 100px;
  height: 60px;
  cursor: move;
  z-index: -1;
}

.div1 {
  position: relative;
  width: 500px;
  height: 500px;
  background: rgb(187, 187, 187);
}
.div1 > p {
  width: 100%;
  text-align: center;
}
.cover{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #0080FF6B;
  z-index: 10;
}
</style>
