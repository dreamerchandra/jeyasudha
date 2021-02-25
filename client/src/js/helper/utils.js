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

export function sort(oriArray, by = 'name') {
  const array = JSON.parse(JSON.stringify(oriArray))
  array.sort((first, sec) => {
    const nameA = first?.[by]?.toUpperCase?.() ?? ''
    const nameB = sec?.[by]?.toUpperCase?.() ?? ''
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
  return array
}
