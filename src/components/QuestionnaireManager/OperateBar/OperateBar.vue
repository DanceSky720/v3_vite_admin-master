<template>
  <div class="bar-container">
    <el-input
      v-model="data"
      clearable
      placeholder="输入关键字"
      class="bar-input"
    >
      <template #append>
        <el-button
          :icon="Search"
          type="primary"
          @click="$emit('query', data)"
        />
      </template>
    </el-input>
    <div class="right">
      <el-button 
        :icon="Refresh" 
        @click="$emit('reload')"
        >
        刷新
      </el-button>
      <el-button 
        :icon="Plus" 
        type="primary" 
        plain 
        @click="$emit('create')"
        >
        创建问卷
        </el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus, Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue'

/**
 * 输入框绑定值
 */
let data = ref('')

defineEmits(['reload', 'create', 'query'])
</script>

<style lang="scss" scoped>
.bar-container {
  box-sizing: border-box;
  height: 60px;
  margin: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 6px rgb(226, 226, 226);
}

.bar-input {
  width: 350px;
}

.right {
  align-items: center;
  justify-content: center;
}
</style>
