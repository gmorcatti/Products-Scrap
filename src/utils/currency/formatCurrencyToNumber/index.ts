export const formatCurrencyToNumber = (currency: string, hasCents: boolean = true) => {
  const regexGetAllThatsNotANumber = /[^0-9]+/g

  const currencyWithoutSymbols = currency.replace(regexGetAllThatsNotANumber, '')

  const currencyNumberWithoutSymbols = Number(currencyWithoutSymbols)

  return hasCents ? currencyNumberWithoutSymbols / 100 : currencyNumberWithoutSymbols
}
