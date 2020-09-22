import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Notification from '../components/notification-view'
import { ref } from '../js/firebase-helper'

export default function useDbFetcher() {
  const [fieldPath, setFieldPath] = useState()
  const [value, setValue] = useState()
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  const [docRef, setDocRef] = useState(() => {
    try {
      return ref().account.where('createdAt', '>=', yesterday)
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
