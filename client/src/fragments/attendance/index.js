import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Footer from '../../components/footer'
import InputClip from '../../components/input-clip'
import MainComponentHolder from '../../components/main-component-holder'
import Notification from '../../components/notification-view'
import updateAttendance from '../../js/firebase-attendance-mutation'

export default function Attendance() {
  const [absentStaffIds, setAbsentIds] = useState([])
  const pushToDb = async () => {
    try {
      await updateAttendance({ absentStaffIds })
      toast(<Notification showSuccessIcon text="Updated Successfully" />)
      setAbsentIds([])
    } catch (err) {
      toast(<Notification showSuccessIcon={false} text="Failed to update" />)
    }
  }
  return (
    <>
      <MainComponentHolder>
        <div className="main">
          <p>Absent list</p>
          <InputClip label="test" setClips={setAbsentIds} clips={absentStaffIds} />
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
