export function filesToBase64(files) {
  const result = []
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader()
    reader.readAsDataURL(files[i])
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      result.push(base64)
    }
  }
  return result
}
