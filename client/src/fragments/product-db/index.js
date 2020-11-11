import React from 'react'
import useDbFetcher from '../../common-hoooks/use-db-fetcher'
import DbComponentHolder from '../../components/DbComponentHolder'
import ProductTable from './product-table'
import QueryPathProvider from '../../components/query-path-provider'
import QueryValueProvider, {
  InputField,
} from '../../components/query-value-provider'

import TablePopulator from '../../components/table-populator'
import { ref } from '../../js/firebase-helper'

const fieldPaths = [
  {
    displayName: 'Particulars',
    getQuery: (queryValue) =>
      ref().productPricing.where('uniqueName', '==', queryValue),
    inputComponent: InputField,
    id: 0,
  },
]

function AccountDb() {
  const {
    docRef,
    onReadyToFetch,
    setFieldPath,
    setValue,
    fieldPath,
    onListAll,
  } = useDbFetcher({
    listAllRef: ref().productPricing,
  })
  return (
    <DbComponentHolder>
      <button type="button" className="list-all paper" onClick={onListAll}>
        List All
      </button>
      <div className="main">
        <QueryPathProvider options={fieldPaths} setOption={setFieldPath} />
        <QueryValueProvider
          queryDetails={fieldPath}
          setValue={setValue}
          onReadyToFetch={onReadyToFetch}
        />
      </div>
      <TablePopulator docRef={docRef} Table={ProductTable} />
    </DbComponentHolder>
  )
}

export default AccountDb
