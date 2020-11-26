export function floatToMoney(num) {
  if (num?.toLocaleString) {
    return num.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    })
  }
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export function getNumberFromFormattedCurrency(num) {
  if (!num) return NaN
  // replaces non digits by nothing
  return Number(num.replaceAll(/[^0-9.]/g, ''))
}

export function assert(assertion, exception) {
  if (!assertion) {
    throw exception
  }
  return true
}
