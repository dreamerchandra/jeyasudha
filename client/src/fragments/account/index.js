import React from 'react'
import Footer from '../../components/footer'
import MainComponentHolder from '../../components/main-component-holder'
import useAccountHooks, { accountPurposeList } from './account-hooks'

const Accounts = () => {
  const {
    amountRef,
    extraField,
    extraFieldRef,
    nameRef,
    purposeRef,
    pushToDb,
    updateDetails,
  } = useAccountHooks()
  return (
    <>
      <MainComponentHolder>
        <div className="main">
          <p>Name</p>
          <input type="text" ref={nameRef} />
          <p>Amount</p>
          <input type="number" min={0} ref={amountRef} />
          <p>Purpose</p>
          <select ref={purposeRef}>
            <option disabled selected value>
              -- select an option --
            </option>
            {accountPurposeList.map((details) => (
              <option
                key={details.id}
                value={details.value}
                itemID={details.id}
                id={details.id}
              >
                {details.value}
              </option>
            ))}
          </select>
          {extraField.show && (
            <>
              <p>{extraField.fieldName}</p>
              <input type="text" ref={extraFieldRef} />
            </>
          )}
        </div>
      </MainComponentHolder>
      <Footer>
        <button
          className="btn paper"
          onClick={pushToDb}
          type="button"
          disabled={updateDetails}
        >
          Update
        </button>
      </Footer>
    </>
  )
}

export default Accounts
