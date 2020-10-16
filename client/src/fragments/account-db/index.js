/* eslint-disable no-restricted-globals */
import React from 'react'
import useDbFetcher from '../../common-hoooks/use-db-fetcher'
import AccountTable from './account-table'
import DbComponentHolder from '../../components/DbComponentHolder'
import QueryPathProvider from '../../components/query-path-provider'
import QueryValueProvider, {
  SelectField,
  InputField,
} from '../../components/query-value-provider'

import TablePopulator from '../../components/table-populator'
import {
  constructQuerySelectorBasedOnCreatedAt,
  ref,
} from '../../js/firebase-helper'
import { assert } from '../../js/helper/utils'
import { accountPurposeList } from '../account/account-hooks'

const fieldPaths = [
  {
    displayName: 'Name',
    getQuery: (queryValue) => ref().account.where('name', '==', queryValue),
    inputComponent: InputField,
    onAssert: (queryValue) =>
      assert(typeof queryValue === 'string', new Error('Name is mandatory')),
    id: 0,
  },
  {
    displayName: 'Amount',
    getQuery: (queryValue) => ref().account.where('amount', '==', queryValue),
    inputComponent: InputField,
    onAssert: (queryValue) =>
      assert(
        typeof Number(queryValue) === 'number',
        new Error('Amount should be a number and is mandatory')
      ),
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
  {
    displayName: 'Created At',
    getQuery: (queryValue) =>
      constructQuerySelectorBasedOnCreatedAt({
        docRef: ref().account,
        date: new Date(queryValue),
      }),
    inputComponent: InputField,
    onAssert: (queryValue) =>
      assert(isFinite(new Date(queryValue)), new Error('InValid Created At')),
    componentProps: {
      type: 'date',
    },
    id: 3,
  },
]

function AccountDb() {
  const { docRef, onReadyToFetch, setFieldPath, setValue, fieldPath } = useDbFetcher(
    constructQuerySelectorBasedOnCreatedAt({
      docRef: ref().account,
      date: new Date(),
    })
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
