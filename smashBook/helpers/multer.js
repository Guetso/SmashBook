// for POST & PUT queries with image file
export default (data) => {
  let formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  return formData
}
