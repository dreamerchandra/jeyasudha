import { getDataFromQuerySnapShot, ref } from './firebase-helper'

export const PAY_CYCLE_ENUM = {
  MONTHLY: 0,
  WEEKLY: 1,
}

export default async function getAbsent({ empId, startDate, endDate }) {
  const data = await ref()
    .attendance.where('createdAt', '>=', startDate)
    .where('createdAt', '<=', endDate)
    .where('absent', 'array-contains', empId)
    .get()
  return getDataFromQuerySnapShot('id', data)
}
