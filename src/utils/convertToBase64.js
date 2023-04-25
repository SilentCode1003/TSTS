export function filesToBase64(files) {
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
          result = result + base64 + ' 5LJOIN '
        } else {
          result = result + base64
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
