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
  const onReadyToFetch = () => {
    setDocRef(fieldPath.getQuery(value))
  }
  return {
    setFieldPath,
    setValue,
    docRef,
    onReadyToFetch,
    fieldPath,
  }
}
