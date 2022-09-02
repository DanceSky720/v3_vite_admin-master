<template>
    <div class="container">
      <div class="top-bar">
        <div class="title mg-0-10">
          <p class="index">{{ index }}</p>
          <el-checkbox 
            class="mg-0-10" 
            label="正确答案" 
            size="large" />
          <el-input-number
            class="mg-0-10"
            :min="0"
            controls-position="right"
            size="small"
          />
        </div>
        <div class="title">
          <p class="arrow" 
            @click="$emit('move-up')" />
          <p class="arrow down" 
            @click="$emit('move-down')" />
          <p @click="$emit('remove')">移除</p>
        </div>
      </div>
      <el-input
        v-model="textarea"
        :rows="3"
        type="textarea"
        resize="none"
        placeholder="填写答案内容"
        clearable
      />
    </div>
  </template>
  
  <script setup lang="ts" name="CardTopic">
  import { reactive, ref, toRefs, watch } from 'vue'
  
  defineProps({
    /**
     * 属性
     */
     index: {
      type: Number,
      required: true,
    },
  })
  
  /**
   * XX的data类型
   */
  type dataType = {
    /**
     * 注释
     */
    text: string
  }
  
  const value = ref('this is a message')
  const textarea = ref('')
  
  defineEmits(['move-up', 'move-down', 'remove'])
  </script>
  
  <style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    width: 573px;
    height: 120px;
    border: 1px solid #d8dce6;
    box-sizing: border-box;
  }
  
  .mg-0-10 {
    margin: 0 10px;
  }
  
  .title {
    display: flex;
    align-content: center;
    align-items: center;
    height: 50px;
  }
  
  .index {
    line-height: 50px;
    font-size: 14px;
  }
  
  .top-bar {
    display: flex;
    justify-content: space-between;
  }
  
  .arrow {
    box-sizing: border-box;
    height: 30px;
    width: 30px;
    display: inline-block;
    position: relative;
    border-width: 2px;
    border-color: #777777;
    border-style: solid;
    border-radius: 50%;
    margin: 0 4px;
  }
  
  .arrow::after {
    position: absolute;
    top: 9px;
    left: 6px;
    content: '';
    height: 12px;
    width: 12px;
    border-width: 2px 2px 0 0;
    border-color: #777777;
    border-style: solid;
    margin: 0;
    transform: rotate(-45deg);
  }
  
  .down {
    transform: rotate(-180deg);
  }
  </style>
  