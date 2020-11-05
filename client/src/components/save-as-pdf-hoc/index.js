import React, { createRef } from 'react'

export default function withSaveAsPdf(Component) {
  const ref = createRef()
  const onSave = () => {
    const newWindow = window.open()
    const fromElement = ref.current
    const toElement = newWindow.document.createElement(fromElement.tagName)
    toElement.innerHTML = fromElement.innerHTML
    newWindow.document.body.appendChild(toElement)
    newWindow.print()
    newWindow.addEventListener('afterprint', () => {
      newWindow.close()
    })
  }
  const SaveAsPdf = (props) => {
    return <Component {...props} ref={ref} onSave={onSave} />
  }
  return SaveAsPdf
}
