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
  data: [
    {
      id: '63',
      title: '疾病调查问卷',
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
          title: '最近3天内有无接触',
          serialNumber: 25,
          type: 'radio',
          options: [
            {
              title: '有',
              serialNumber: '48',
              explain: 'in',
              fraction: 27,
            },
            {
              title: '没有',
              serialNumber: '29',
              explain: 'occaecat elit laborum velit',
              fraction: 20,
            }
          ],
        },
        {
          id: '10',
          title: '爱好',
          serialNumber: 25,
          type: 'checkbox',
          options: [
            {
              title: '唱',
              serialNumber: '48',
              explain: 'in',
              fraction: 27,
            },
            {
              title: '跳',
              serialNumber: '29',
              explain: 'occaecat elit laborum velit',
              fraction: 20,
            },
            {
              title: 'rap',
              serialNumber: '69',
              explain: 'reprehenderit mollit',
              fraction: 36,
            },
          ],
        },
        {
          id: '101',
          title: '鸡你',
          serialNumber: 25,
          type: 'radio',
          options: [
            {
              title: '鸡你太美',
              serialNumber: '48',
              explain: 'in',
              fraction: 27,
            },
            {
              title: '鸡你实在是太美',
              serialNumber: '29',
              explain: 'occaecat elit laborum velit',
              fraction: 20,
            }
          ]
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
    }]
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
