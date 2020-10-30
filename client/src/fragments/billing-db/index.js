import React from 'react'
import useDbFetcher from '../../common-hoooks/use-db-fetcher'
import BillingTable from './billing-table'
import DbComponentHolder from '../../components/DbComponentHolder'
import QueryPathProvider from '../../components/query-path-provider'
import QueryValueProvider, {
  InputField,
} from '../../components/query-value-provider'
import TablePopulator from '../../components/table-populator'
import {
  constructQuerySelectorBasedOnCreatedAt,
  ref,
} from '../../js/firebase-helper'

const fieldPaths = [
  {
    displayName: 'Customer Name',
    getQuery: (queryValue) => ref().billing.where('name', '==', queryValue),
    inputComponent: InputField,
    id: 0,
  },
  {
    displayName: 'Phone number',
    getQuery: (queryValue) => ref().billing.where('phoneNumber', '==', queryValue),
    inputComponent: InputField,
    id: 1,
  },
  {
    displayName: 'Particulars',
    getQuery: (queryValue) =>
      ref().billing.where('orderNames', 'array-contains', queryValue),
    inputComponent: InputField,
    id: 2,
  },
  {
    displayName: 'Created At',
    getQuery: (queryValue) =>
      constructQuerySelectorBasedOnCreatedAt({
        docRef: ref().billing,
        fieldPath: 'createdAt',
        date: new Date(queryValue),
      }),
    inputComponent: InputField,
    componentProps: {
      type: 'date',
    },
    id: 3,
  },
]

function BillingDb() {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  const { docRef, onReadyToFetch, setFieldPath, setValue, fieldPath } = useDbFetcher(
    ref().billing.where('createdAt', '>=', yesterday)
  )
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
      <TablePopulator docRef={docRef} Table={BillingTable} />
    </DbComponentHolder>
  )
}

export default BillingDb
