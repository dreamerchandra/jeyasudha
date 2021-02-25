import React from 'react'
import useDbFetcher from '../../common-hoooks/use-db-fetcher'
import DbComponentHolder from '../../components/DbComponentHolder'
import QueryPathProvider from '../../components/query-path-provider'
import QueryValueProvider, {
  InputField,
} from '../../components/query-value-provider'
import StaffLoanTable from './staff-loan-table'
import TablePopulator from '../../components/table-populator'
import { ref } from '../../js/firebase-helper'

const fieldPaths = [
  {
    displayName: 'Emp Id',
    getQuery: (queryValue) => ref().staffLoan.where('lenderEmpId', '==', queryValue),
    inputComponent: InputField,
    id: 1,
  },
]

function StaffLoanDb() {
  const {
    docRef,
    onReadyToFetch,
    setFieldPath,
    setValue,
    fieldPath,
    onListAll,
  } = useDbFetcher({
    listAllRef: ref().staffLoan,
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
      <TablePopulator docRef={docRef} Table={StaffLoanTable} />
    </DbComponentHolder>
  )
}

export default StaffLoanDb
