import { debounce } from 'throttle-debounce'

const debounceDelay = 500

export default function debounceFunction({
  callBack,
  delay = debounceDelay,
  atBegin = false,
} = {}) {
  if (callBack) {
    return debounce(delay, atBegin, callBack)
  }
  throw new Error('throttle function should carry a callback')
}
