import React from 'react'
import useDbFetcher from '../../common-hoooks/use-db-fetcher'
import DbComponentHolder from '../../components/DbComponentHolder'
import LedgerTable from './ledger-table'
import QueryPathProvider from '../../components/query-path-provider'
import QueryValueProvider, {
  InputField,
} from '../../components/query-value-provider'
import TablePopulator from '../../components/table-populator'
import { ref } from '../../js/firebase-helper'

const fieldPaths = [
  {
    displayName: 'Phone Number',
    getQuery: (queryValue) => ref().ledger.where('phoneNumber', '==', queryValue),
    inputComponent: InputField,
    id: 0,
  },
]

function LedgerDb() {
  const {
    docRef,
    onReadyToFetch,
    setFieldPath,
    setValue,
    fieldPath,
  } = useDbFetcher()
  return (
    <DbComponentHolder>
      <div className="main">
        <QueryPathProvider options={fieldPaths} setOption={setFieldPath} />
        <QueryValueProvider
          queryDetails={fieldPath}
          setValue={setValue}
          onReadyToFetch={onReadyToFetch}
        />
      </div>
      <TablePopulator docRef={docRef} Table={LedgerTable} />
    </DbComponentHolder>
  )
}

export default LedgerDb
