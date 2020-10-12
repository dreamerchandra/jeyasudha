import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/footer'
import MainComponentHolder from '../../components/main-component-holder'

export default function StaffSalaryDb() {
  const [date, setDate] = useState()
  const history = useHistory()
  return (
    <>
      <MainComponentHolder>
        <div className="main">
          <p>Pay cycle Start date</p>
          <input type="date" onInput={(event) => setDate(event.target.value)} />
        </div>
      </MainComponentHolder>
      <Footer>
        <button
          className="btn paper"
          type="button"
          onClick={() => {
            history.push(`/staff/payouts/archive/${date}`)
          }}
        >
          Get Details
        </button>
      </Footer>
    </>
  )
}
