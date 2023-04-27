const fileSeparator = ' 5LJOIN '
const fileNameSeparator = '::'

/**
 * @param {Array} files - the files array from converted from FileList
 * @returns {Promise} the long string with serialized data (filename::base64string 5LJOIN filename::base64string)
 */
export const filesTo5LSerializedData = (files) => {
  return new Promise((resolve, reject) => {
    let result = ''
    let count = 0
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()
      reader.readAsDataURL(files[i])
      reader.onload = () => {
        const base64 = reader.result

        // Only add a separator when its not the last item
        if (i !== files.length - 1) {
          result = `${result}${files[i].name}${fileNameSeparator}${base64}${fileSeparator}`
        } else {
          result = `${result}${files[i].name}${fileNameSeparator}${base64}`
        }

        count++
        if (count === files.length) {
          resolve(result)
        }
      }
      reader.onerror = (error) => {
        reject(error)
      }
    }
  })
}

/**
 *
 * @param {string} serializedData
 * @returns {Object} the file name and the base64 encoded data
 */
export const serializedDataToFile = (serializedData) => {
  const deserializedData = serializedData.split(fileNameSeparator)
  const fileName = deserializedData[0]
  const fileData = deserializedData[1]

  return { fileName, fileData }
}
