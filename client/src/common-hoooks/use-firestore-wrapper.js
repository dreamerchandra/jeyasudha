import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCollectionDataOnce as useCollectionDataOnceLib } from 'react-firebase-hooks/firestore'
import Notification from '../components/notification-view'

export default function useCollectionDataOnce({ ref, idField = 'id' }) {
  const [data, loading, error] = useCollectionDataOnceLib(ref, {
    idField,
  })

  useEffect(() => {
    if (error) {
      toast(<Notification showSuccessIcon={false} text={error.message} />)
    }
  }, [error])

  return { data, loading, error }
}
