<template>
  <div class="container"></div>
</template>

<script setup lang="ts" name="V1Test">
import util from './util'
import { reactive, ref, toRefs, watch } from 'vue'

const xm: String[] = 
 
[ 'label', 'hello',
  'value', 'world',]

function deepClone1<T>(source: T): T {
  let copy = {
    ...source,
    length: Object.keys(source).length,
  }

  function iterative<T>(obj: T) {
    obj[Symbol.iterator] = function* () {
      let keys = Object.keys(obj)
      for (const k of keys) {
        yield { [k]: obj[k] }
      }
    }
  }

  function arrayDeep(arr: string[]) {
    return arr.map((item) => {
      return Array.isArray(item) ? arrayDeep(item) : item
    })
  }
  function toObj<T>(objArray: T[]): T {
    const cp = {} as T
    objArray.forEach((item) => {
      if (Object.keys(item)[0] === 'length') {
        return
      }
      Object.defineProperty(cp, Object.keys(item)[0], {
        value: Object.values(item)[0],
        writable: true,
      })
    })
    return cp
  }
  iterative(copy)
  return toObj(arrayDeep(Array.from(copy)))
}
const a = deepClone1(xm)
a[1] = 'world'
a[0] = 'hello'
console.log(xm);


</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100vh - 105px - 32px);
  background: white;
}
</style>
