export function filesToBase64(files) {
  return new Promise((resolve, reject) => {
    let result = ''
    let count = 0
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()
      reader.readAsDataURL(files[i])
      reader.onload = () => {
        const base64 = reader.result.split(',')[1]
        result = result + base64 + ' 5LJOIN '
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
