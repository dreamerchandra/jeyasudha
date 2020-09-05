import { useState } from "react";


const STATE = {
  PENDING: 'pending',
  FETCHED: 'fetched',
  ERROR: 'err',
}
/**
 * 
 * @param {{query: firebase.firestore.Query, queryOptions: firebase.firestore.GetOptions}} query 
 */
export default function useCollectionQuery ({ query, queryOptions = { source: "default" } }) {
  const [result, setResult] = useState();
  const [state, setState] = useState(STATE.NA);
  query.get(queryOptions)
}