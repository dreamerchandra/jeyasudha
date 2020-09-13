import { ref } from './firebase-helper'
import { getProductDetailBasedOnUniqueName } from './firebase-pricing-query'

/**
 *
 * @param {{productRef: firebase.firestore.DocumentReference}} param0
 */
export async function updateProductPrice({ productRef, productDetails }) {
  return productRef.set(productDetails, {
    mergeFields: ['billingPrice', 'govtPrice', 'cgstPercent', 'sgstPercent'],
  })
}

export function newProductRef() {
  return ref().productPricing.doc()
}

/**
 *
 * @param {{productRef: firebase.firestore.DocumentReference}} param0
 */
export async function newProductPrice({
  productRef = newProductRef(),
  productDetails,
}) {
  return productRef.set(productDetails)
}

export function oldProductRef(id) {
  return ref().productPricing.doc(id)
}

export async function upsertProduct({ productDetails }) {
  const { id } = await getProductDetailBasedOnUniqueName({
    uniqueName: productDetails.uniqueName,
    id: 'id',
  })
  if (id) {
    return updateProductPrice({
      productRef: oldProductRef(id),
      productDetails,
    })
  }
  return newProductPrice({ productDetails })
}
