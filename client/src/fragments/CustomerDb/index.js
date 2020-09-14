import React from 'react'
import useCollectionDataOnce from '../../common-hoooks/use-firestore-wrapper'
import CustomerTable from '../../components/customer-table'
import LoaderHoc from '../../components/loading'
import MainComponentHolder from '../../components/main-component-holder'
import { ref } from '../../js/firebase-helper'
import './index.css'

function CustomerDb() {
  const { data: customerData, loading } = useCollectionDataOnce({
    ref: ref().customer,
    idField: 'id',
  })
  return (
    <MainComponentHolder>
      {loading && (
        <LoaderHoc>
          <h1>Downloading customer data</h1>
        </LoaderHoc>
      )}
      <CustomerTable customerData={customerData} />
    </MainComponentHolder>
  )
}

export default CustomerDb
