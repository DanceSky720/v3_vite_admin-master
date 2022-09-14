<template>
  <div class="container">
    <el-table :data="data" height="550px"  stripe>
      <el-table-column type="index" align="center" />
      <el-table-column label="ID" prop="id" align="center" />
      <el-table-column label="问卷名称" prop="title" align="center" />
      <el-table-column label="创建日期" prop="createDate" align="center" />
      <el-table-column
        label="最后修改时间"
        prop="lastUpdateDate"
        align="center"
      />
      <el-table-column label="状态" prop="isEnable" align="center">
        <template #default="{ row }">
          <span :style="enableCell(row.isEnable).color">
            {{ enableCell(row.isEnable).text }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ $index }">
          <el-button
            class="list-btn"
            :icon="Search"
            plain
            @click="$emit('view', $index)"
          />
          <el-button
            class="list-btn"
            :icon="Edit"
            plain
            @click="$emit('edit', $index)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import { Edit, Search } from '@element-plus/icons-vue'
import { PropType } from 'vue'
defineProps({
  /**
   * 问卷列表
   */
  data: {
    type: Array as PropType<Questionnaire[]>,
    default: [],
  },
})

/**
 * 状态样式
 * @param isEnable 是否启用
 */
const enableCell = (isEnable: number) => {
  return {
    color: { color: isEnable === 1 ? '#67C23A' : '#F56C6C' },
    text: isEnable === 1 ? '启用' : '停用'
  }
}

defineEmits(['edit', 'view'])
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  margin: 10px;
  box-shadow: 0px 0px 6px rgb(226, 226, 226);
}

.list-btn {
  margin: 0 2px;
}
</style>
