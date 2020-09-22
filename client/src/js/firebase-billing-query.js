import { ref, getDataFromQuerySnapShot } from './firebase-helper'

export async function getCustomerDetailBasedOnSearchString({
  searchString,
  id = '',
}) {
  const documentData = await ref()
    .customer.where('name', '>=', searchString)
    .where('name', '<=', `${searchString}~`)
    .limit(4)
    .get()
  return getDataFromQuerySnapShot(id, documentData)
}
