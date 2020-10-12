import { getDataFromQuerySnapShot, ref } from './firebase-helper'

export const PAY_CYCLE_ENUM = {
  MONTHLY: 0,
  WEEKLY: 1,
}

export function getAbsentQuery({ empId, startDate, endDate }) {
  return ref()
    .attendance.where('createdAt', '>=', startDate)
    .where('createdAt', '<=', endDate)
    .where('absent', 'array-contains', empId)
    .orderBy('createdAt')
}

export default async function getAbsent({ empId, startDate, endDate }) {
  const data = await getAbsentQuery({ empId, startDate, endDate }).get()
  return getDataFromQuerySnapShot('id', data)
}
