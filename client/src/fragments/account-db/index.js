import React from 'react'
import useCollectionDataOnce from '../../common-hoooks/use-firestore-wrapper'
import AccountTable from '../../components/account-table'
import LoaderHoc from '../../components/loading'
import MainComponentHolder from '../../components/main-component-holder'
import { ref } from '../../js/firebase-helper'

function AccountDb() {
  const { data: accountData, loading } = useCollectionDataOnce({
    ref: ref().account,
    idField: 'id',
  })
  return (
    <MainComponentHolder>
      {loading && (
        <LoaderHoc>
          <h1>Downloading accounts data</h1>
        </LoaderHoc>
      )}
      <AccountTable accountData={accountData} />
    </MainComponentHolder>
  )
}

export default AccountDb
