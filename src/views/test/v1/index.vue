<template>
  <div class="container"></div>
</template>

<script setup lang="ts" name="V1Test">
import { reactive, ref, toRefs, watch } from "vue";

// /**
//  * 判断对象是否为数组
//  * @param obj
//  * @returns
//  */
// function IsArray(obj: any) {
//   return obj && typeof obj == "object" && obj instanceof Array;
// }

// /**
//  * 对象深拷贝
//  * @param tSource
//  * @returns
//  */
// function deepClone<T>(tSource: T, tTarget?: Record<string, any> | T): T {
//   if (IsArray(tSource)) {
//     tTarget = tTarget || [];
//   } else {
//     tTarget = tTarget || {};
//   }
//   tTarget = IsArray(tSource) ? tTarget || [] : tTarget || {}
//   for (const key in tSource) {
//     if (Object.prototype.hasOwnProperty.call(tSource, key)) {
//       if (typeof tSource[key] === "object" && typeof tSource[key] !== null) {
//         tTarget[key] = IsArray(tSource[key]) ? [] : {};
//         deepClone(tSource[key], tTarget[key]);
//       } else {
//         tTarget[key] = tSource[key];
//       }
//     }
//   }
//   return tTarget as T;
// }
// const a = {
//   name: 'ana',
//   friends:[{name: 'yoy'}]
// }

// const b = deepClone(a)
// b.friends[0] = {name: 'ays'}
// b.name = 'bob'
// console.log(b);
// console.log(a);

</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 105px - 32px);
  background: white;
}

.tss {
  width: 100%;
  height: calc(200vh);
}
</style>
