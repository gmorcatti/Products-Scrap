export const formatCurrencyToNumber = (currency: string) => {
  const regexGetAllThatsNotANumber = /[^0-9]+/g

  const currencyWithoutSymbols = currency.replace(regexGetAllThatsNotANumber, '')

  const currencyNumberWithoutSymbols = Number(currencyWithoutSymbols)

  return currencyNumberWithoutSymbols / 100
}
