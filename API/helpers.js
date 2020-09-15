module.exports = (array) => {
  let tmpArr = []
  for (const obj in array) {
    if (tmpArr.indexOf(array[obj].player) < 0) {
      tmpArr.push(array[obj].player)
    } else {
      return false
    }
  }
  return true
}
