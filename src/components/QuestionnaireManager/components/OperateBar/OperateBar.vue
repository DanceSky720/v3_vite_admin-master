<template>
  <div class="bar-container">
    <el-form inline>
      <el-form-item
        class="bar-container_mg-0"
        label="问卷名称"
      >
        <el-input
          v-model="data"
          clearable
          placeholder="输入关键字"
          class="bar-input"
        />
      </el-form-item>
      <el-form-item
        class="bar-container_mg-0"
        label="创建人"
      >
        <el-input
          v-model="data"
          clearable
          placeholder="创建人"
          class="bar-input"
        />
      </el-form-item>
    </el-form>

    <el-button
      class="bar-container_btn"
      :icon="Refresh"
      @click="$emit('reload')"
    >
      重置
    </el-button>
    <el-button
      class="bar-container_btn"
      :icon="Refresh"
      type="primary"
      @click="$emit('query')"
    >
      搜索
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue'

/**
 * 输入框绑定值
 */
const data = ref('')

defineEmits(['reload', 'query'])
</script>

<style lang="scss" scoped>
@import "../../style";

.bar-container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 70px;
  padding: 10px;
  margin: 10px;
  background: #fff;
  border-radius: $q-border-radius-small;
  box-shadow: $q-box-shadow-normal;

  &_mg-0 {
    margin: 0 10px;
  }

  &_btn {
    margin: 0 10px;
  }
}
</style>
