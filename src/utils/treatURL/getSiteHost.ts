export const getSiteHost = (url: string) => {
  const regexRemovePathParams = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/img
  const siteHost = regexRemovePathParams.exec(url)[1]
  return siteHost
}
