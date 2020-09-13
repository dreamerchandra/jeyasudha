export function getGrandTotalFromSubTotal(subTotal, cgst, sgst) {
  return subTotal + (cgst * subTotal) / 100 + (sgst * subTotal) / 100
}
