import React, { useEffect, useState } from 'react'
import MainComponentHolder from '../../components/main-component-holder'
import { getCustomerDetailBasedOnSearchString } from '../../js/firebase-billing-query'
import { floatToMoney } from '../../js/helper/utils'
import './index.css'

function CustomerDb() {
  const [customerData, setCustomerData] = useState([])
  useEffect(() => {
    async function setCustomerDataToState() {
      setCustomerData(
        await getCustomerDetailBasedOnSearchString({ searchString: '', id: 'id' })
      )
    }
    setCustomerDataToState()
  }, [])
  return (
    <MainComponentHolder>
      <table className="db-table">
        <thead>
          <tr>
            <td className="db-id">Id</td>
            <td className="db-cus-name">Customer Name</td>
            <td className="db-ph">Phone number</td>
            <td className="db-due">Overall due</td>
          </tr>
        </thead>
        <tbody>
          {customerData.map(({ id, name, phoneNumber, overallDue }) => (
            <tr>
              <td>{id}</td>
              <td>{name}</td>
              <td>{phoneNumber}</td>
              <td>Rs.{floatToMoney(overallDue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainComponentHolder>
  )
}

export default CustomerDb
