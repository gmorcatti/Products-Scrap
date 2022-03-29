export const removeQueryParams = (url: string) => {
  const arrayUrl = url.split('')
  const indexOfInterrogation = arrayUrl.findIndex((letter) => letter === '?')

  if (indexOfInterrogation === -1) return url

  return arrayUrl.slice(0, indexOfInterrogation).join('')
}
