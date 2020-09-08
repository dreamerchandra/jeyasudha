import { ref, getDataFromQuerySnapShot } from './firebase-helper'

export default class ProductPricingList {
  static async fetchFromFirestore() {
    const documentData = await ref().productPricing.get()
    return getDataFromQuerySnapShot('id', documentData)
  }
}
