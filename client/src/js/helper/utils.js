export function floatToMoney(num) {
  if (num?.toLocaleString) {
    return num.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    })
  }
  return Math.round((num + Number.EPSILON) * 100) / 100
}
