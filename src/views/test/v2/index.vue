<template>
  <div class="container">
    <QuestionnaireManager class="manager" v-model="q.data" :questionnaire-type="questionnaireType.data"
      v-model:active="active" @reload="reload" @save="save" @query="query" v-model:current-page="current"  />
  </div>
</template>

<script setup lang="ts" name="V1Test">
import { reactive, ref, toRefs, watch } from 'vue'
import QuestionnaireManager from '../../../components/QuestionnaireManager/QuestionnaireManager.vue'

let questionnaireType = reactive({data:[{label:'流调表',value:'ldb'},{label:'问卷',value:'wj'}] as questionnaireType[]})

let active = ref(0)
let current = ref(1)

let q = reactive({
  data: [
    {
      id: '63',
      title: '能头过象见',
      totalScore: 50,
      isEnable: 1,
      details: undefined,
      createDate: '2002-10-27',
      lastUpdateUserName: 'zs',
      lastUpdateDate: '1979-01-02',
      type: undefined,
      subjectList: [
        {
          id: '9',
          title: '你影土队办温会1',
          serialNumber: 25,
          type: 'radio',
          options: [
            {
              title: '五分二子',
              serialNumber: '48',
              explain: 'in',
              fraction: 27,
            },
            {
              title: '具感装志',
              serialNumber: '29',
              explain: 'occaecat elit laborum velit',
              fraction: 20,
            },
            {
              title: '了林明任目强而',
              serialNumber: '69',
              explain: 'reprehenderit mollit',
              fraction: 36,
            },
          ],
        },
        {
          id: '10',
          title: '你影土队办温会',
          serialNumber: 25,
          type: 'radio',
          options: [
            {
              title: '五分二子',
              serialNumber: '48',
              explain: 'in',
              fraction: 27,
            },
            {
              title: '具感装志',
              serialNumber: '29',
              explain: 'occaecat elit laborum velit',
              fraction: 20,
            },
            {
              title: '了林明任目强而',
              serialNumber: '69',
              explain: 'reprehenderit mollit',
              fraction: 36,
            },
          ],
        }
      ]
    }, {
      id: '631',
      title: '能头过象ewr423见',
      details: undefined,
      totalScore: 510,
      isEnable: 1,
      createDate: '2002-10-28',
      lastUpdateUserName: 'qw',
      lastUpdateDate: '1979-01-02',
      type: undefined,
      subjectList: [
        {
          id: '911',
          title: '你影12土qew队办温会',
          serialNumber: 25,
          type: 'checkbox',
          options: [
            {
              title: '五分二q子',
              serialNumber: '48',
              explain: 'in',
              fraction: 27,
            },
            {
              title: '具感装q志',
              serialNumber: '291',
              explain: 'occaecat elit laborum velit',
              fraction: 20,
            },
            {
              title: '了林明任q目强而',
              serialNumber: '69',
              explain: 'reprehenderit mollit',
              fraction: 36,
            },
          ],
        },
        {
          id: '1101',
          title: '你影土12q队办温会',
          serialNumber: 25,
          type: 'checkbox',
          options: [
            {
              title: '五q分二子',
              serialNumber: '48',
              explain: 'in',
              fraction: 27,
            },
            {
              title: '具感q装志',
              serialNumber: '29',
              explain: 'occaecat elit laborum velit',
              fraction: 20,
            },
            {
              title: '了林明qq任目强而',
              serialNumber: '69',
              explain: 'reprehenderit mollit',
              fraction: 36,
            },
          ],
        }
      ]
    }
  ]
})


function reload() {
  console.log('reload')
}

function save() {
  console.log(q.data[active.value]);

}

/**
 * 查询按钮点击
 * @param text 查询关键字
 */
 function query(text: string){
  console.log(text);
  
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  min-height: calc(100vh - 105px - 32px);
  background: white;
}

.manager {
  box-sizing: border-box;
  width: 100%;
}
</style>
