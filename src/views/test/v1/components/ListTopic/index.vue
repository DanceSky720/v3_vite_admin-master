<template>
    <div class="container">
        <button @click="insert">insert at random index</button>
        <button @click="reset">reset</button>

        <TransitionGroup  name="fade" tag="div" class="container">
            <CardTopic 
              class="card"
              v-for="i,index in items" 
              :key="i.name" 
              :index="index" 
              @move-up="moveUp(index)" 
              @move-down="moveDown(index)"
              @remove="remove(index)" />
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts" name="ListTopic">
import util from '../../util'
import { reactive, ref, watch, } from 'vue'
import CardTopic from './CardTopic.vue';


const items = ref([{name:'小明1'}, {name:'小明2'}, {name:'小明3'}]) 

watch(items.value, (newValue) => {
  console.log(JSON.parse(JSON.stringify(newValue)));
  
})

function insert() {
    const i = Math.round(Math.random() * items.value.length)
    items.value.push({name:`小明${items.value.length + 1}`})
}

function reset() {
    items.value = [{name:'小明1'}, {name:'小明2'}, {name:'小明3'}]
}

function remove(item: number) {
        items.value.splice(item, 1)
}

function moveUp(index: number){ 
    this.items = util.upwards<Object>(this.items,index)
}

function moveDown(index: number){ 
    this.items = util.downward<Object>(this.items,index)
}



</script>

<style lang="scss" scoped>
.container {
    background: #fff;
    transition: all 0.5s;
}

.card {
  margin: 9px 0;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.1) translate(50px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
