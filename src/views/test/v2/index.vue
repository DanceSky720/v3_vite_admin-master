<template>
  <div class="container">
    <QuestionnaireManager
      v-model:current-page="current"
      v-model:show-dialog="show"
      :data="data"
      :questionnaire="q"
      class="manager"
      :save-func="something"
      @reload="reload"
      @query="query"
      @create="show = true"
      @batch-deletion="t"
      @edit="t"
      @remove="t"
      @view="t"
      @close="show = false"
    />
  </div>
</template>

<script setup lang="ts" name="V1Test">
import { reactive, ref, toRefs, watch } from 'vue'
import QuestionnaireManager from '../../../components/QuestionnaireManager/QuestionnaireManager.vue'
import { QuestionnaireStatus } from '../../../entity/enum/QuestionnaireStatus.entity';

let show = ref(false)
let current = ref(1)

let data = ref<Questionnaire[]>([])
let q = ref<Questionnaire | undefined>({
  id: '',
  /**
   * 标题
   */
  title: '',
  /**
   * 详情
   */
  details: '',
  /**
   * 问卷类型
   */
  type: '',
  /**
   * 项目列表
   */
  subjectList: []
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

function something(data1: Questionnaire){
 console.log(data1);
 data.value.push(data1)
  
}
function t(){
  console.log('click');
  
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
