import React from 'react'
import useDbFetcher from '../../common-hoooks/use-db-fetcher'
import CustomerTable from '../../components/customer-table'
import DbComponentHolder from '../../components/DbComponentHolder'
import QueryPathProvider from '../../components/query-path-provider'
import QueryValueProvider, {
  InputField,
} from '../../components/query-value-provider'
import './index.css'
import TablePopulator from '../../components/table-populator'
import { ref } from '../../js/firebase-helper'

const fieldPaths = [
  {
    displayName: 'Name',
    getQuery: (queryValue) => ref().customer.where('name', '==', queryValue),
    inputComponent: InputField,
    id: 0,
  },
  {
    displayName: 'Phone Number',
    getQuery: (queryValue) => ref().customer.where('phoneNumber', '==', queryValue),
    inputComponent: InputField,
    id: 1,
  },
  {
    displayName: 'Address',
    getQuery: (queryValue) =>
      ref().customer.where('primaryAddress', '==', queryValue),
    inputComponent: InputField,
    id: 2,
  },
]

function CustomerDb() {
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
      <TablePopulator docRef={docRef} Table={CustomerTable} />
    </DbComponentHolder>
  )
}

export default CustomerDb
