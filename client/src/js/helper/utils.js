/* eslint-disable no-restricted-globals */
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

export function dateRangeAssertion(value) {
  if (!value.from) throw new Error('Select From date')
  if (!value.to) throw new Error('Select To date')
  assert(isFinite(value.to), new Error('InValid To Date'))
  assert(isFinite(value.from), new Error('InValid From  Date'))
  assert(value.from < value.to, new Error('From should be smaller than To'))
}

export function dateDiffInDays(date1, date2) {
  // round to the nearest whole number
  return Math.round((date2 - date1) / (1000 * 60 * 60 * 24))
}
