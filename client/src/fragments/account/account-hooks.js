import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Notification from '../../components/notification-view'
import AccountData from '../../js/AccountData'

export const accountPurposeList = [
  { id: 1, value: 'Conveyance' },
  { id: 2, value: 'Allowances' },
  { id: 4, value: 'Site', subField: 'Site Name' },
  { id: 5, value: 'PO', subField: 'Po Number' },
  { id: 6, value: 'Crushers' },
  { id: 7, value: 'Others', subField: 'Description' },
]

export default function useAccountHooks() {
  const nameRef = useRef()
  const purposeRef = useRef()
  const amountRef = useRef()
  const [updateDetails, setUpdateDetails] = useState(false)
  const [extraField, setExtraField] = useState({ show: false, fieldName: '' })
  const extraFieldRef = useRef()
  const pushToDb = async () => {
    try {
      const accountData = AccountData.createFromUI({
        nameRef,
        purposeRef,
        amountRef,
        extraFieldRef,
      })
      setUpdateDetails(true)
      await accountData.pushToDb()
      toast(<Notification showSuccessIcon text="Successfully updated" />)
      nameRef.current.value = ''
      purposeRef.current.value = ''
      amountRef.current.value = ''
      setExtraField({ show: false, fieldName: '' })
    } catch (err) {
      toast(<Notification showSuccessIcon={false} text={err.message} />)
    }
    setUpdateDetails(false)
  }
  const onPurposedChanged = (event) => {
    const {
      target: { options, selectedIndex },
    } = event
    const selectedItemId = Number(options[selectedIndex].id)
    const [selectedItem] = accountPurposeList.filter(
      (list) => list.id === selectedItemId
    )
    if (selectedItem?.subField) {
      setExtraField({
        fieldName: selectedItem.subField,
        show: true,
      })
    } else {
      setExtraField({
        fieldName: '',
        show: false,
      })
    }
  }
  useEffect(() => {
    const purposeNode = purposeRef.current
    purposeNode.addEventListener('input', onPurposedChanged)
    return () => purposeNode.removeEventListener('input', onPurposedChanged)
  }, [])
  return {
    nameRef,
    amountRef,
    extraField,
    extraFieldRef,
    purposeRef,
    pushToDb,
    updateDetails,
  }
}
