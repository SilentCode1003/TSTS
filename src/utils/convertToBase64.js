export function filesToBase64(files) {
  let result = ''
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader()
    reader.readAsDataURL(files[i])
    reader.onload = () => {
      const base64String = reader.result
        .replace('data:', '')
        .replace(/^.+,/, '')
      result += base64String + ' -- '
      console.log(result)
    }
  }

  return result
}
