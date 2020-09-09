export default class OrderDetail {
  constructor(particularDetails, unit) {
    this.particularDetails = particularDetails
    this.unit = Number(unit)
    this.total = Number(particularDetails.actualPrice * this.unit)
  }

  isFieldsValid() {
    return this.unit && this.total
  }
}
