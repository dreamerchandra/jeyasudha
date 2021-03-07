import React, { createRef, useState } from 'react'
import { toast } from 'react-toastify'
import Footer from '../../components/footer'
import InputClip from '../../components/input-clip'
import MainComponentHolder from '../../components/main-component-holder'
import Notification from '../../components/notification-view'
import StaffSuggestionList from '../../components/staff-suggestion-list'
import SuggestibleInput from '../../components/suggestable-input'
import updateAttendance from '../../js/firebase-attendance-mutation'
import StaffDetails from '../../js/StaffDetails'

export default function Attendance() {
  const [absentStaffIds, setAbsentIds] = useState([])
  const nameRef = createRef()

  const pushToDb = async () => {
    try {
      await updateAttendance({ absentStaffIds })
      toast(<Notification showSuccessIcon text="Updated Successfully" />)
      setAbsentIds([])
    } catch (err) {
      toast(<Notification showSuccessIcon={false} text="Failed to update" />)
    }
  }

  const onSuggestionItemSelected = (staffId, staff) => {
    const { empId } = staff
    setAbsentIds((ids) => {
      return [...ids, empId]
    })
    nameRef.current.value = ''
  }
  return (
    <>
      <MainComponentHolder>
        <div className="main">
          <p>Staff Name</p>
          <SuggestibleInput
            inputRef={nameRef}
            onSuggestionItemSelected={onSuggestionItemSelected}
            SuggestionItemList={StaffSuggestionList}
            fetchDetailsBasedOnSearchString={StaffDetails.getStaffsBySearchString}
            placeholder="Search by staff Name"
          />
          <p>Absent list</p>
          <InputClip
            label="test"
            setClips={setAbsentIds}
            clips={absentStaffIds}
            placeholder="Enter employee id."
            noClip="Start by typing name or id"
          />
        </div>
      </MainComponentHolder>
      <Footer>
        <button className="btn paper" type="button" onClick={pushToDb}>
          Update Absent list
        </button>
      </Footer>
    </>
  )
}
