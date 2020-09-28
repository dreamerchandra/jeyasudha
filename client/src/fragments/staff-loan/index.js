import React, { Component, createRef } from 'react'
import { toast } from 'react-toastify'
import Footer from '../../components/footer'
import MainComponentHolder from '../../components/main-component-holder'
import Notification from '../../components/notification-view'
import { createNewLoan } from '../../js/firebase-loan-mutation'
import { STAFF_LOAN_ENUM } from '../../js/firebase-loan-query'
import { proceedIfLoanEligible } from '../../js/loan'

const typeOfLoan = [
  {
    label: 'EMI',
    value: 0,
    subField: true,
    id: 0,
  },
  {
    label: 'ADVANCE',
    value: 1,
    id: 1,
  },
]

export default class StaffLoan extends Component {
  constructor() {
    super()
    this.empIdRef = createRef()
    this.loanAmountRef = createRef()
    this.typeOfLoanRef = createRef()
    this.emiAmountRef = createRef()
    this.state = {
      emiAmountReq: false,
    }
  }

  onLoanTypeChanged = (event) => {
    const {
      target: { options, selectedIndex },
    } = event
    const selectedItemId = Number(options[selectedIndex].id)
    const [selectedItem] = typeOfLoan.filter((list) => list.id === selectedItemId)
    if (selectedItem.subField) {
      this.setState({ emiAmountReq: true })
    } else {
      this.setState({ emiAmountReq: false })
    }
  }

  getValuesFromUI() {
    const { emiAmountReq } = this.state
    const typeOfLoanFromUI = emiAmountReq
      ? STAFF_LOAN_ENUM.TYPE.EMI
      : STAFF_LOAN_ENUM.TYPE.ADVANCE
    return {
      loanAmount: Number(this.loanAmountRef.current.value),
      emiAmount: Number(this.emiAmountRef?.current?.value || 0),
      empId: this.empIdRef.current.value,
      typeOfLoan: typeOfLoanFromUI,
    }
  }

  processLoan = async () => {
    try {
      const valuesFromUi = this.getValuesFromUI()
      const { staffDetails } = await proceedIfLoanEligible(valuesFromUi)
      await createNewLoan({ ...valuesFromUi, staffDocId: staffDetails.docId })
      toast(<Notification showSuccessIcon text="Loan created" />)
    } catch (err) {
      toast(<Notification showSuccessIcon={false} text={err.message} />)
    }
    this.clearUI()
  }

  clearUI() {
    this.loanAmountRef.current.value = ''
    if (this.emiAmountRef.current) this.emiAmountRef.current.value = ''
    if (this.empIdRef.current) this.empIdRef.current.value = ''
    this.typeOfLoanRef.current.value = ''
  }

  render() {
    const { emiAmountReq } = this.state
    return (
      <>
        <MainComponentHolder>
          <div className="main">
            <p>Emp id</p>
            <input type="text" ref={this.empIdRef} />
            <p>Loan Amount</p>
            <input type="number" min={0} ref={this.loanAmountRef} />
            <p>Type of loan</p>
            <select
              name="loan type"
              ref={this.typeOfLoanRef}
              onInput={this.onLoanTypeChanged}
            >
              <option disabled defaultValue selected value={-1}>
                -- select an type --
              </option>
              {typeOfLoan.map((typeData) => (
                <option key={typeData.label} value={typeData} id={typeData.id}>
                  {typeData.label}
                </option>
              ))}
            </select>
            {emiAmountReq && (
              <>
                <p>Emi Amount</p>
                <input type="number" min={0} ref={this.emiAmountRef} />
              </>
            )}
          </div>
        </MainComponentHolder>
        <Footer>
          <button type="button" className="btn paper" onClick={this.processLoan}>
            Create Loan
          </button>
        </Footer>
      </>
    )
  }
}
