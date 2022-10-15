<template>
  <div class="container"></div>
</template>

<script setup lang="ts" name="V1Test">
import { it } from 'element-plus/lib/locale'
import { reactive, ref, toRefs, watch } from 'vue'

interface Rank {
  rid?: number
}
class Boy {
  id: number
  name: string
}

class BoyEditableVersion implements Rank {
  id: number
  name: string
  rid: number
}
function choice<T>(obj: T, ...props: string[]): T {
  return props.reduce((result, prop) => {
    result[prop] = obj[prop]
    return result
  }, {} as T)
}
const boy: Boy = {
  id: 1,
  name: 'xiaoming',
}

const boy1: BoyEditableVersion = { ...boy, rid: 1 }
const boy2: Boy = choice<Boy>(boy1, 'id', 'name')
const boy3 = { ...boy1 }

console.log(removeProperties<Boy>(boy1, 'rid'))

function removeProperties<T>(source: object, prop: string): T{
  let sourceList = Object.entries(source)
  const entries = sourceList.map((item: [string, any], index: number) => {
    if (item[0] === prop) {
      return sourceList[index - 1] ?? sourceList[index + 1]
    }
    return item
  })
  return Object.fromEntries(entries) as T
}
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
