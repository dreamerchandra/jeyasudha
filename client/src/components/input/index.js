import React, { useEffect, useRef } from 'react'
import './index.css';

const useInput = () => {
  const ref = useRef();
  const inputValue = ref.current?.value;
  useEffect(() => {
    const blurCb = (event) => {
      if (!event.target.validity.valid) {
        ref.current.classList.add('input-error');
      } else {
        ref.current.classList.remove('input-error');
      }
    }
    ref.current.addEventListener('blur', blurCb);
    return () => {
      ref.current.removeEventListener('blur', blurCb);
    }
  }, [])
  useEffect(() => {
    ref.current.classList.remove('input-error');
    if (inputValue) {
      ref.current.classList.add('input-given')
    } else {
      ref.current.classList.remove('input-given')
    }
  }, [inputValue]);

  return { ref };
}



export default function Input ({ title, inputType = 'title', onChange: _onChange }) {
  const { ref } = useInput();
  return (
    <span className="input-group">
      <input className="input" type={inputType} required onChange={_onChange} ref={ref} />
      <span className="input-highlight"></span>
      <span className="input-bar"></span>
      <label>{title}</label>
    </span>
  )
}