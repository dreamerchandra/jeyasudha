import React, { Component, createRef } from 'react'
import { toast } from 'react-toastify'
import Footer from '../../components/footer'
import MainComponentHolder from '../../components/main-component-holder'
import Notification from '../../components/notification-view'
import StaffDetails from '../../js/StaffDetails'

const payCycle = [
  {
    displayText: 'MONTHLY',
    value: 0,
  },
  {
    displayText: 'WEEKLY',
    value: 1,
  },
]

export default class StaffUpdate extends Component {
  constructor() {
    super()
    this.staffNameRef = createRef()
    this.empIdRef = createRef()
    this.payCycleRef = createRef()
    this.salaryRef = createRef()
    this.state = {
      updateDetails: false,
    }
  }

  getValuesFromUI() {
    return {
      name: this.staffNameRef.current.value,
      empId: this.empIdRef.current.value,
      payCycle: Number(this.payCycleRef.current.value),
      salary: Number(this.salaryRef.current.value),
    }
  }

  updateInDb = async () => {
    this.setState({ updateDetails: true })
    const staffDetails = new StaffDetails(this.getValuesFromUI())
    if (staffDetails.isFieldsValid()) {
      await staffDetails.upsertToDb()
      toast(<Notification showSuccessIcon text="Staff details updated" />)
      this.clearValue()
    } else {
      toast(<Notification showSuccessIcon={false} text="Invalid fields" />)
    }
    this.setState({ updateDetails: false })
  }

  clearValue = () => {
    this.staffNameRef.current.value = ''
    this.empIdRef.current.value = ''
    this.payCycleRef.current.value = ''
    this.salaryRef.current.value = ''
  }

  render() {
    const { updateDetails } = this.state
    return (
      <>
        <MainComponentHolder>
          <div className="main">
            <p>Staff Name</p>
            <input ref={this.staffNameRef} />
            <p>Emp id</p>
            <input ref={this.empIdRef} />
            <p>Pay cycle</p>
            <select ref={this.payCycleRef}>
              {payCycle.map(({ displayText, value }) => (
                <option value={value} key={value}>
                  {displayText}
                </option>
              ))}
            </select>
            <p>Salary</p>
            <input type="number" min={0} ref={this.salaryRef} />
          </div>
        </MainComponentHolder>
        <Footer>
          <button
            type="button"
            className="btn paper"
            disabled={updateDetails}
            onClick={this.updateInDb}
          >
            Update
          </button>
        </Footer>
      </>
    )
  }
}
