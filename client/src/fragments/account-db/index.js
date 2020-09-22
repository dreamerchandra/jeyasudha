import React from 'react'
import useDbFetcher from '../../common-hoooks/use-db-fetcher'
import AccountTable from '../../components/account-table'
import DbComponentHolder from '../../components/DbComponentHolder'
import QueryPathProvider from '../../components/query-path-provider'
import QueryValueProvider, {
  SelectField,
  InputField,
} from '../../components/query-value-provider'

import TablePopulator from '../../components/table-populator'
import { ref } from '../../js/firebase-helper'
import { accountPurposeList } from '../account/account-hooks'

const fieldPaths = [
  {
    displayName: 'Name',
    getQuery: (queryValue) => ref().account.where('name', '==', queryValue),
    inputComponent: InputField,
    id: 0,
  },
  {
    displayName: 'Amount',
    getQuery: (queryValue) => ref().account.where('amount', '==', queryValue),
    inputComponent: InputField,
    componentProps: {
      type: 'number',
    },
    id: 1,
  },
  {
    displayName: 'Purpose',
    getQuery: (queryValue) => ref().account.where('purpose', '==', queryValue),
    inputComponent: SelectField,
    componentProps: {
      list: accountPurposeList,
    },
    id: 2,
  },
]

function AccountDb() {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  const { docRef, onReadyToFetch, setFieldPath, setValue, fieldPath } = useDbFetcher(
    ref().account.where('createdAt', '>=', yesterday)
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
      <TablePopulator docRef={docRef} Table={AccountTable} />
    </DbComponentHolder>
  )
}

export default AccountDb
