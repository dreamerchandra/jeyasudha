import { useState } from 'react'
import cx from 'classnames'
import useToggle from './use-toggle'

const useToToggleClassName = ({ baseClassName, toggledClassName }) => {
  const [className, setClassName] = useState(baseClassName)
  const onToggle = (isOpened) => {
    setClassName(
      cx(className, {
        [toggledClassName]: isOpened,
      })
    )
  }
  const { toggler } = useToggle({ onToggle })
  return { className, toggler }
}

export default useToToggleClassName
