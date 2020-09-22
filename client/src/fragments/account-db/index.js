import React, { useState } from 'react'
import AccountTable from '../../components/account-table'
import DbComponentHolder from '../../components/DbComponentHolder'
import TablePopulator from '../../components/table-populator'
import { ref } from '../../js/firebase-helper'
import AccountQueryValueProvider from './account-query-value-provier'

function AccountDb() {
  const fieldPaths = ['name', 'amount', 'purpose']
  const [fieldPath, setFieldPath] = useState()
  const [value, setValue] = useState()
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  const [docRef, setDocRef] = useState(() =>
    ref().account.where('createdAt', '>=', yesterday)
  )
  const onReadyToFetch = () => {
    console.log('fetching', fieldPath, value)
    window.ref = ref().account.where(fieldPath, '==', value)
    setDocRef(ref().account.where(fieldPath, '==', value))
  }
  return (
    <DbComponentHolder>
      <div className="main">
        <span>
          <p>Select </p>
          <select
            onInput={({ target }) => {
              setFieldPath(target.value)
            }}
          >
            <option disabled defaultValue selected>
              -- select an type --
            </option>
            {fieldPaths.map((path) => (
              <option key={path} value={path}>
                {path}
              </option>
            ))}
          </select>
          <p> to show</p>
        </span>
        <AccountQueryValueProvider
          fieldValue={fieldPath}
          setValue={setValue}
          onReadyToFetch={onReadyToFetch}
        />
      </div>
      <TablePopulator docRef={docRef} Table={AccountTable} />
    </DbComponentHolder>
  )
}

export default AccountDb
