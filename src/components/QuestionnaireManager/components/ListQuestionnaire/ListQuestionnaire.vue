<template>
  <div class="list-container">
    <div class="list-container_ground">
      <p>问卷列表</p>
      <div>
        <el-button
          class="list-btn"
          :icon="Delete"
          type="danger"
          :disabled="allow"
          plain
          @click="$emit('batch-deletion', ids)"
        >
          批量删除
        </el-button>
        <el-button
          class="list-btn"
          :icon="Plus"
          type="primary"
          @click="$emit('create')"
        >
          创建问卷
        </el-button>
      </div>
    </div>
    <el-table
      :data="data"
      stripe
      highlight-current-row
      @selection-change="selected = $event"
    >
      <el-table-column
        type="selection"
        align="center"
      />
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80"
      />
      <el-table-column
        label="ID"
        prop="id"
        align="center"
      />
      <el-table-column
        label="问卷名称"
        prop="title"
        align="center"
      />
      <el-table-column
        label="创建日期"
        prop="createDate"
        align="center"
      />
      <el-table-column
        label="更新日期"
        prop="lastUpdateDate"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
        width="250"
      >
        <template #default="{ $index }">
          <el-button
            class="list-btn"
            :icon="Search"
            plain
            @click="$emit('view', data[$index].id )"
          />
          <el-button
            class="list-btn"
            :icon="Edit"
            plain
            @click="$emit('edit', data[$index].id )"
          />
          <el-button
            class="list-btn"
            :icon="Delete"
            type="danger"
            plain
            @click="$emit('remove', data[$index].id )"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { Edit, Search, Delete, Plus } from '@element-plus/icons-vue'
import { computed, PropType, ref } from 'vue'
defineProps({
  /**
   * 问卷列表
   */
  data: {
    type: Array as PropType<Questionnaire[]>,
    default: []
  }
})

/**
 * 选中的列表
 */
const selected = ref<Questionnaire[]>()

/**
 * 是否允许点击批量删除
 */
const allow = computed(() => {
  if (selected.value) {
    return selected.value.length < 1
  }
  return true
})
/**
 * 选中要删除的问卷的id集合
 */
const ids = computed(() => {
  if (selected.value) {
    return selected?.value?.map((q: Questionnaire) => q.id)
  }
  return null
})

defineEmits(['edit', 'view', 'remove', 'create', 'batch-deletion'])

</script>

<style lang="scss" scoped>
@import '../../style';

.list-container {
  box-sizing: border-box;
  margin: 10px;
  overflow-y: auto;
  scrollbar-width: none;
  background: #fff;
  box-shadow: $q-box-shadow-normal;

  &_ground {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    color: #313131;
  }
}

</style>
