import React from 'react';
import './index.css';

export default function LoaderHoc ({ children }) {
  return (
    <div className='loading'>
      <div className='spinner-wrapper'>
        <div className="spinner"></div>
      </div>
      {typeof (children) !== "undefined" && children}
    </div>
  )
}