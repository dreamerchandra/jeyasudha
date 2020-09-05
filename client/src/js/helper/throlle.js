import { throttle } from 'throttle-debounce';

/*
  uses throttle-debounce to create debounced or throttled functions
*/

// throttle-debounce delay ms
const throttleDelay = 500;

export default function throttleFunction ({ callBack, delay = throttleDelay, noTrailing = false } = {}) {
  if (callBack) {
    return throttle(delay, noTrailing, callBack);
  }
}