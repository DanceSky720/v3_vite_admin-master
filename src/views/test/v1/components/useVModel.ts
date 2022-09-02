import { ref, watch } from "vue";
export function useVModel(props, emit) {
  const proxy = ref(props.modelValue);
  watch(
    () => proxy.value,
    (v) => emit("update:modelValue", v)
  );
  return proxy;
}