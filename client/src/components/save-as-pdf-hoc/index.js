import React, { createRef } from 'react'

export default function withSaveAsPdf(Component) {
  const ref = createRef()
  const pdfCss = createRef()
  const setPdfCss = (css) => {
    pdfCss.current = css
  }
  const onSave = () => {
    const newWindow = window.open()
    const fromElement = ref.current
    const toElement = newWindow.document.createElement(fromElement.tagName)
    toElement.innerHTML = fromElement.innerHTML
    if (pdfCss.current) {
      const style = newWindow.document.createElement('style')
      style.innerText = pdfCss.current
      newWindow.document.body.appendChild(style)
    }
    newWindow.document.body.appendChild(toElement)
    newWindow.print()
    newWindow.addEventListener('afterprint', () => {
      newWindow.close()
    })
  }
  const SaveAsPdf = (props) => {
    return <Component {...props} ref={ref} onSave={onSave} setPdfCss={setPdfCss} />
  }
  return SaveAsPdf
}
