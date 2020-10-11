import React, { useState } from 'react'
import useDidUpdateEffect from '../../common-hoooks/use-did-update-hooks'

import useCollectionDataOnce from '../../common-hoooks/use-firestore-wrapper'
import LoaderHoc from '../../components/loading'
import MainComponentHolder from '../../components/main-component-holder'
import StaffSalaryTable from '../../components/staff-salary-list'
import { PAY_CYCLE_ENUM } from '../../js/firbase-attendance-query'
import {
  constructQuerySelectorBasedOnCreatedAt,
  ref,
} from '../../js/firebase-helper'
import { floatToMoney } from '../../js/helper/utils'
import StaffSalary from '../../js/StaffSalary'

function getPayDate(payCycle) {
  const days = payCycle === PAY_CYCLE_ENUM.WEEKLY ? 7 : 30
  return new Date(new Date().setDate(new Date().getDate() - days))
}

export function StaffPayoutListBy({ payCycle, payDate = null }) {
  if (payDate) {
    return function StaffPayoutListByDate() {
      const salaryCreditRef = constructQuerySelectorBasedOnCreatedAt({
        docRef: ref().salaryCredit,
        date: payDate,
        fieldPath: 'payCycleStart',
      })
      if (payCycle) {
        salaryCreditRef.where('payCycle', '==', payCycle)
      }
      const { data, loading } = useCollectionDataOnce({
        ref: salaryCreditRef,
        idField: 'id',
      })
      return (
        <MainComponentHolder>
          {loading && (
            <LoaderHoc>
              <h1>Downloading Staff salary</h1>
            </LoaderHoc>
          )}
          {data && <StaffSalaryTable data={data} />}
        </MainComponentHolder>
      )
    }
  }
  return function StaffPayoutListByCycle() {
    const { data: staffDetails } = useCollectionDataOnce({
      ref: ref().staffDetails.where('payCycle', '==', payCycle),
      idField: 'id',
    })
    const [aggregateData, setAggData] = useState()
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState()
    useDidUpdateEffect(() => {
      setLoading(true)
      StaffSalary.calculateNetSalaryList({
        staffDetails,
        startDate: getPayDate(payCycle),
      }).then((staffDetailsList) => {
        const aggData = staffDetailsList.map((details) => {
          return { ...details.convertThisToSalaryCreditSnap(), id: details.empId }
        })
        setLoading(false)
        setAggData(aggData)
        setTotal(aggData.reduce((sum, data) => sum + data.netSalary, 0))
      })
    }, [staffDetails?.length])
    return (
      <MainComponentHolder>
        {typeof total === 'number' && (
          <span className="ref">Total: Rs.{floatToMoney(total)}</span>
        )}
        {loading && (
          <LoaderHoc>
            <h1>Downloading Staff salary</h1>
          </LoaderHoc>
        )}
        {aggregateData && <StaffSalaryTable data={aggregateData} />}
      </MainComponentHolder>
    )
  }
}
