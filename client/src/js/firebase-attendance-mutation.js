import { getServerTimeStamp, ref } from './firebase-helper'

export default async function updateAttendance({ absentStaffIds: rawAbsentList }) {
  const removedNulls = rawAbsentList.filter((id) => id)
  const removedDuplicates = [...new Set(removedNulls)]
  return ref().attendance.doc().set({
    createdAt: getServerTimeStamp(),
    absent: removedDuplicates,
  })
}
