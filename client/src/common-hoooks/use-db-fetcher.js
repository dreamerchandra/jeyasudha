import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Notification from '../components/notification-view'

export default function useDbFetcher(initialRef) {
  const [fieldPath, setFieldPath] = useState()
  const [value, setValue] = useState()
  const [docRef, setDocRef] = useState(() => {
    try {
      return initialRef
    } catch (err) {
      console.error('constructing db fetch ref failed with err:', err)
      toast(<Notification showSuccessIcon={false} text="Fill necessary fields" />)
    }
    return null
  })
  const formatter = (data) => {
    return fieldPath?.formatData?.(value, data) ?? data
  }
  const onReadyToFetch = () => {
    try {
      if (fieldPath.onAssert) {
        fieldPath.onAssert(value)
      }
      if (value) {
        setDocRef(fieldPath.getQuery(value))
        return
      }
      throw new Error('Query string is required')
    } catch (err) {
      toast(<Notification showSuccessIcon={false} text={err.message} />)
    }
  }
  return {
    setFieldPath,
    setValue,
    docRef,
    onReadyToFetch,
    fieldPath,
    formatter,
  }
}
