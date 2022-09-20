<template>
  <div class="container">
    <QuestionnaireManager
      :data="q.data"
      v-model:current-page="current"
      class="manager"
      :questionnaire-type="questionnaireType.data"
      :save-func="something"
      @reload="reload"
      @query="query"
    />
  </div>
</template>

<script setup lang="ts" name="V1Test">
import { reactive, ref, toRefs, watch } from 'vue'
import QuestionnaireManager from '../../../components/QuestionnaireManager/QuestionnaireManager.vue'

let questionnaireType = reactive({data:[{label:'流调表',value:'ldb'},{label:'问卷',value:'wj'}] as questionnaireType[]})

let active = ref(0)
let current = ref(1)

let q = reactive({
  data: []
})



function reload() {
  console.log('reload')
}


/**
 * 查询按钮点击
 * @param text 查询关键字
 */
 function query(text: string){
  console.log(text);
}

function something(data: Questionnaire){
 console.log(data);
 this.data.push(data)
  
}
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
