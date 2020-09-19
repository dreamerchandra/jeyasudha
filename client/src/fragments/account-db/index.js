import React, { useState } from 'react'
import useCollectionDataOnce from '../../common-hoooks/use-firestore-wrapper'
import AccountTable from '../../components/account-table'
import LoaderHoc from '../../components/loading'
import MainComponentHolder from '../../components/main-component-holder'
import { ref } from '../../js/firebase-helper'
import { accountPurposeList } from '../account/account-hooks'

function AccountFetcher({ option }) {
  const { data: accountData, loading } = useCollectionDataOnce({
    ref: ref().account.where('purpose', '==', option),
    idField: 'id',
  })
  return (
    <>
      {' '}
      {loading && (
        <LoaderHoc>
          <h1>Downloading accounts data</h1>
        </LoaderHoc>
      )}
      {accountData && <AccountTable accountData={accountData} />}
    </>
  )
}

function AccountDb() {
  const [option, setOption] = useState()
  return (
    <MainComponentHolder>
      {option && <AccountFetcher option={option} />}
      {!option && (
        <div className="main">
          <p>Select Data to show</p>
          <select
            onInput={({ target }) => {
              setOption(target.value)
            }}
          >
            <option disabled selected value>
              -- select an option --
            </option>
            {accountPurposeList.map((details) => (
              <option
                key={details.id}
                value={details.value}
                itemID={details.id}
                id={details.id}
              >
                {details.value}
              </option>
            ))}
          </select>
        </div>
      )}
    </MainComponentHolder>
  )
}

export default AccountDb
