import { ref } from "./firebase-helper";

export function getQueryForCustomerSearch (searchString) {
  return ref().customer.where('name', '>=', searchString).where('name', '<=', `${searchString}~`)
}


const getDataFromQuerySnapShot = (idKey, documentData) => {
  let returnResult = [];
  documentData.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    if (idKey) {
      returnResult.push({
        ...data,
        [idKey]: id,
      })
    } else {
      returnResult.push({
        ...data,
      })
    }
  })
  return returnResult;
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