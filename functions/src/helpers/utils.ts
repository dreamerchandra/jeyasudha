export const getDataFromQuerySnapShot = (idKey: string, documentData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => {
  const returnResult: Array<any> = []
  documentData.forEach((doc) => {
    const data = doc.data()
    const { id } = doc
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
  return returnResult
}