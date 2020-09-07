import { ref, getDataFromQuerySnapShot } from "./firebase-helper";

export function getQueryForCustomerSearch (searchString) {
  return ref().customer.where('name', '>=', searchString).where('name', '<=', `${searchString}~`)
}


/**
 * 
 * @param {{query: firebase.firestore.Query, key: String}} param0 
 * @returns {Promise<firebase.firestore.DocumentData[]>}
 */
export async function getCollectionData ({ query, key = '', idKey = '' }) {
  console.log('fetching details');
  const documentData = await query.get();
  return getDataFromQuerySnapShot(idKey, documentData);
}