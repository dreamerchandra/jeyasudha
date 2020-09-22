import { ref, getDataFromQuerySnapShot } from './firebase-helper'

export async function getProductDetailBasedOnSearchString({
  searchString,
  id = '',
}) {
  const documentData = await ref()
    .productPricing.where('uniqueName', '>=', searchString)
    .where('uniqueName', '<=', `${searchString}~`)
    .limit(4)
    .get()
  return getDataFromQuerySnapShot(id, documentData)
}

export async function getProductDetailBasedOnUniqueName({ uniqueName, id }) {
  const documentData = await ref()
    .productPricing.where('uniqueName', '==', uniqueName)
    .get()
  const [data] = getDataFromQuerySnapShot(id, documentData)
  return data || {}
}
