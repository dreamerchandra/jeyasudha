export default class OrderDetail {
  constructor(particularDetails, unit) {
    this.particularDetails = particularDetails
    this.unit = Number(unit)
    this.govtPrice = Number(particularDetails.govtPrice * this.unit)
    this.billingCost = Number(particularDetails.billingPrice * this.unit)
    this.billingCgstCost = Number(
      (particularDetails.cgstPercent / 100) * this.billingCost
    )
    this.govtCgstCost = Number(
      (particularDetails.cgstPercent / 100) * this.govtPrice
    )
    this.billingSgstCost = Number(
      (particularDetails.sgstPercent / 100) * this.billingCost
    )
    this.govtSgstCost = Number(
      (particularDetails.sgstPercent / 100) * this.govtPrice
    )
    this.netGovtCost = Number(this.govtPrice + this.govtCgstCost + this.govtSgstCost)
    this.netBillingCost = Number(
      this.billingCost + this.billingCgstCost + this.billingSgstCost
    )
  }

  isFieldsValid() {
    return this.unit && this.govtPrice
  }
}
