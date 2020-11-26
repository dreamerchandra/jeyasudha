import React, { useEffect } from 'react'
import BillBody from './bill-body'
import './print/index.css'

const PrintContainer = ({ billDetails }) => (
  <div className="print-container">
    <h1>Bill Structure</h1>
    <BillBody billDetails={billDetails} />
  </div>
)

const Print = ({ billDetails = { orders: [] }, showPrintPreview, afterPrintCb }) => {
  useEffect(() => {
    window.addEventListener('afterprint', afterPrintCb)
  }, [])
  useEffect(() => {
    if (showPrintPreview) {
      window.print()
    }
  }, [showPrintPreview])
  if (!showPrintPreview) {
    return null
  }
  return (
    <section className="print">
      <PrintContainer billDetails={billDetails} />
    </section>
  )
}

export default Print
