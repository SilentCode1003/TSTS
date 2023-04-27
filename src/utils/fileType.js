import mime from 'mime-types'

export const getMimeTypeFromBase64 = (encoded) => {
  let result

  if (typeof encoded !== 'string') {
    return result
  }

  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)

  if (mime && mime.length) {
    result = mime[1]
  }

  return result
}

export const getFileTypeFromMime = (mimeString) => {
  return mime.extension(mimeString)
}

export const getFileExtension = (base64String) => {
  const fileMime = getMimeTypeFromBase64(base64String)
  const fileExt = getFileTypeFromMime(fileMime)
  return fileExt
}
