<template>
  <transition name="bounce">
    <div
      v-show="value"
      class="dialog-follow-container"
      :style="{ left: `${left}px`, top: `${top}px` }"
    >
      <p class="dialog-follow-container_title">标题</p>

      <div class="dialog-follow-container_content">
        一般说来，记忆力减退分两种情况，一种是我们认为自己的记忆力减退了，
        是一种假象，另一种则是因为身体的衰老等原因记忆力真的减退了，是真相。
      </div>
      <div class="dialog-follow-container_btn-ground">
        <el-button plain @click="value = false"> 取消 </el-button>
        <el-button plain type="primary" @click="value = false"> 确定 </el-button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import useVisible from '../../hook/useVisible'

const { x, y } = useVisible()

const props = defineProps({
  /**
   * 属性
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const value = ref(false)
const left = ref(0)
const top = ref(0)

const emit = defineEmits(['update:modelValue'])

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue
    if (newValue) {
      top.value = y.value
      left.value = x.value
    }
  },
  { immediate: true, deep: true }
)

watch(value, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style lang="scss" scoped>
.dialog-follow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  background: #fff;
  width: 200px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #eee;
  border-radius: 4px;

  &_title {
    font-weight: bold;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    padding: 8px 8px 0;
  }

  &_content {
    padding: 10px;
    box-sizing: border-box;
    width: 200px;
  }

  &_btn-ground {
    padding: 0 8px 8px;
    align-self: flex-end;
    display: flex;
  }
}

.dialog-btn-confirm {
}
.bounce-move,
.bounce-leave-active,
.bounce-enter-active {
  transition: all 0.3s ease-out;
}

.bounce-enter-from,
.bounce-leave-to {
  opacity: 0;
  transform-origin: center;
  transform: rotateX(90deg) scale(0.8);
  border-radius: 10px;
}

.bounce-leave-active {
  position: absolute;
}
</style>
