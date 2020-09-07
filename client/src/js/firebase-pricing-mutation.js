import { ref } from "./firebase-helper"
import { getProductDetailBasedOnUniqueName } from "./firebase-pricing-query"

/**
 * 
 * @param {{productRef: firebase.firestore.DocumentReference}} param0 
 */
export async function updateProductPrice ({ productRef, productDetails }) {
  return await productRef.set(productDetails, { mergeFields: ['fixedPrice', 'actualPrice'] })
}

/**
 * 
 * @param {{productRef: firebase.firestore.DocumentReference}} param0 
 */
export async function newProductPrice ({ productRef = newProductRef(), productDetails }) {
  return await productRef.set(productDetails)
}


export function newProductRef () {
  return ref().productPricing.doc()
}

export function oldProductRef (id) {
  return ref().productPricing.doc(id)
}


export async function upsertProduct ({ productDetails }) {
  const { id } = await getProductDetailBasedOnUniqueName({ uniqueName: productDetails.uniqueName, id: 'id' })
  if (id) {
    return await updateProductPrice({ productRef: oldProductRef(id), productDetails })
  }
  return await newProductPrice({ productDetails })
}