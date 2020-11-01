import React from 'react'
import cx from 'classnames'
import './index.css'

export default function PrintableSurface({ children, shouldShowPrintPreview }) {
  const className = cx('', {
    'g-print-holder': shouldShowPrintPreview,
  })
  return (
    <section className={className}>
      <>{children}</>
    </section>
  )
}
