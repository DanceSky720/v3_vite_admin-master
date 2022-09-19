/**
 * 交换数组两个元素位置
 * @param array 要交换的数组
 * @param wanna 要交换的元素下标1
 * @param wannabe 要交换的元素下标2
 * @returns 改变过的数组
 */
function swapPlaces<T>(array: T[], wanna: number, wannabe: number): T[] {
  return array.map((item: T, index: number) => {
    if (index === wannabe) {
      return array[wanna]
    }
    if (index === wanna) {
      return array[wannabe]
    }
    return item
  })
}
/**
 * 将底部元素置顶
 * @param array 要改变的数组
 * @returns 改变过的数组
 */
function downwardOverload<T>(array: T[]): T[] {
  return array.map((item: T, index: number) => {
    return index === 0 ? array[array.length - 1] : array[index - 1]
  })
}
/**
 * 将顶部元素置底
 * @param array 要改变的数组
 * @returns 改变过的数组
 */
function upwardOverload<T>(array: T[]): T[] {
  return array.map((item: T, index: number) => {
    return index === array.length - 1 ? array[0] : array[index + 1]
  })
}
/**
 * 数组元素上移,如果这个要上移的元素下标为0,将其置底
 * @param array 要交换的数组
 * @param wanna 要上移的元素下标
 * @returns 交换过的数组
 */
function upwards<T>(array: T[], wanna: number): T[] {
  return wanna === 0 ? upwardOverload(array) : swapPlaces(array, wanna, wanna - 1)
}
/**
 * 数组元素下移,如果这个要下移的元素下标位置在数组最后一位,则将其置顶
 * @param array 要交换的数组
 * @param wanna 要下移的元素下标
 * @returns 交换过的数组
 */
function downward<T>(array: T[], wanna: number): T[] {
  if (wanna + 1 > array.length - 1) {
    return downwardOverload(array)
  }
  return swapPlaces(array, wanna, wanna + 1)
}

export default {
  upwards,
  downward,
}