import React from 'react'
import useDbFetcher from '../../common-hoooks/use-db-fetcher'
import DbComponentHolder from '../../components/DbComponentHolder'
import QueryPathProvider from '../../components/query-path-provider'
import QueryValueProvider, {
  InputField,
} from '../../components/query-value-provider'
import StaffDetailsTable from './staff-details-table'
import TablePopulator from '../../components/table-populator'
import { ref } from '../../js/firebase-helper'

const fieldPaths = [
  {
    displayName: 'Name',
    getQuery: (queryValue) => ref().staffDetails.where('name', '==', queryValue),
    inputComponent: InputField,
    id: 0,
  },
  {
    displayName: 'Emp Id',
    getQuery: (queryValue) => ref().staffDetails.where('empId', '==', queryValue),
    inputComponent: InputField,
    id: 1,
  },
]

function StaffDetailsDb() {
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
      <TablePopulator docRef={docRef} Table={StaffDetailsTable} />
    </DbComponentHolder>
  )
}

export default StaffDetailsDb
