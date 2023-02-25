export function getSpanArr(data, standard) {
  const spanArr = []
  let position
  for (var i = 0; i < data.length; i++) {
    if (i === 0) {
      spanArr.push(1)
      position = 0
    } else {
      // 判断当前元素与上一个元素是否相同
      if (data[i][standard] === data[i - 1][standard]) {
        spanArr[position] += 1
        spanArr.push(0)
      } else {
        spanArr.push(1)
        position = i
      }
    }
  }
  return spanArr
}
