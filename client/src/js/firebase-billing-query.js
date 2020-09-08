import { ref, getDataFromQuerySnapShot } from './firebase-helper'

export async function getCustomerDetailBasedOnSearchString({
  searchString,
  id = '',
}) {
  const documentData = await ref()
    .customer.where('name', '>=', searchString)
    .where('name', '<=', `${searchString}~`)
    .get()
  return getDataFromQuerySnapShot(id, documentData)
}
