import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Footer from '../../components/footer'
import MainComponentHolder from '../../components/main-component-holder'
import Notification from '../../components/notification-view'
import QueryValueProvider, {
  InputField,
} from '../../components/query-value-provider'
import { floatToMoney } from '../../js/helper/utils'
import StaffSalary from '../../js/StaffSalary'

export default function StaffSalaryFragment() {
  const [empId, setEmpId] = useState('')
  const [name, setName] = useState('')
  const [workingDays, setWorkingDays] = useState('')
  const [salary, setSalary] = useState('')
  const [deductions, setDeductions] = useState('')
  const [netSalary, setNetSalary] = useState('')
  const [startDate, setStartDate] = useState()
  const [updating, setUpdating] = useState(false)
  const [staffSalaryState, setStaffSalary] = useState()
  return (
    <>
      <MainComponentHolder>
        <div className="main">
          <p>Emp id</p>
          <QueryValueProvider
            queryDetails={{
              inputComponent: InputField,
            }}
            setValue={setEmpId}
            onReadyToFetch={async () => {
              try {
                const staffSalary = new StaffSalary(empId, startDate)
                const {
                  deductions: calculatedDeduction,
                  payableSalary,
                  staff,
                  workingDay,
                } = await staffSalary.getSalaryPayOutDetails({ empId, startDate })
                setStaffSalary(staffSalary)
                setName(staff.name)
                setSalary(staff.salary)
                setWorkingDays(workingDay)
                setNetSalary(payableSalary)
                setDeductions(calculatedDeduction)
              } catch (err) {
                toast(<Notification showSuccessIcon={false} text={err.message} />)
              }
            }}
          />
          <p>Pay Cycle Start Date</p>
          <input
            type="date"
            onInput={({ target }) => setStartDate(new Date(target.value))}
          />
          <p>Name</p>
          <input type="text" value={name} disabled />
          <p>Working days</p>
          <input type="text" value={workingDays} disabled />
          <p>Salary</p>
          <input type="text" value={`Rs.${floatToMoney(salary)}`} disabled />
          <p>Deductions</p>
          <input type="text" value={`Rs.${floatToMoney(deductions)}`} disabled />
          <p>Net Salary</p>
          <input type="text" value={`Rs.${floatToMoney(netSalary)}`} disabled />
        </div>
      </MainComponentHolder>
      <Footer>
        <button
          type="button"
          className="btn paper"
          onClick={async () => {
            try {
              setUpdating(true)
              await staffSalaryState.pushToDb()
              toast(
                <Notification showSuccessIcon text="Successfully updated details" />
              )
              setName('')
              setWorkingDays('')
              setSalary('')
              setDeductions('')
              setNetSalary('')
            } catch (err) {
              toast(<Notification showSuccessIcon={false} text={err.message} />)
            }
            setUpdating(false)
          }}
          disabled={updating}
        >
          Paid
        </button>
      </Footer>
    </>
  )
}
