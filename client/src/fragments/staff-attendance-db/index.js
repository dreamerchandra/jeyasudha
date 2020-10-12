import React from 'react'
import useDbFetcher from '../../common-hoooks/use-db-fetcher'
import DbComponentHolder from '../../components/DbComponentHolder'
import QueryPathProvider from '../../components/query-path-provider'
import QueryValueProvider, {
  InputField,
} from '../../components/query-value-provider'
import TablePopulator from '../../components/table-populator'
import { getAbsentQuery } from '../../js/firbase-attendance-query'
import {
  constructQuerySelectorBasedOnCreatedAt,
  ref,
} from '../../js/firebase-helper'
import { assert } from '../../js/helper/utils'
import StaffAttendDanceTable from './staff-attendance-table'

const fieldPaths = [
  {
    displayName: 'Date',
    getQuery: (queryValue) =>
      constructQuerySelectorBasedOnCreatedAt({
        docRef: ref().attendance,
        date: new Date(queryValue),
      }),
    inputComponent: InputField,
    componentProps: {
      type: 'date',
    },
    onAssert: (queryValue) =>
      // eslint-disable-next-line no-restricted-globals
      assert(isFinite(new Date(queryValue)), new Error('InValid Date')),
    id: 0,
  },
  {
    displayName: 'Emp Id',
    getQuery: (queryValue) =>
      getAbsentQuery({
        empId: queryValue,
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
        endDate: new Date(),
      }),
    inputComponent: InputField,
    formatData: (queryValue, result) => {
      if (!result) return result
      return result.map(({ absent = [], createdAt, id }) => {
        return {
          absent: absent.filter((empId) => empId === queryValue),
          createdAt,
          id,
        }
      })
    },
    id: 1,
  },
]

function StaffAttendanceDb() {
  const {
    docRef,
    onReadyToFetch,
    setFieldPath,
    setValue,
    fieldPath,
    formatter,
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
      <TablePopulator
        docRef={docRef}
        Table={StaffAttendDanceTable}
        formatFetchedDataCb={formatter}
      />
    </DbComponentHolder>
  )
}

export default StaffAttendanceDb
