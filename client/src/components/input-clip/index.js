import React, { useState } from 'react'
import Clip from '../clip'
import './index.css'

const removeClip = (labelToBeRemovedFromClip) => (clips) =>
  clips.filter((clip) => clip !== labelToBeRemovedFromClip)

export default function InputClip({ setClips = () => {}, clips }) {
  const [word, setWord] = useState('')
  const updateState = (event) => {
    const { key } = event
    if (key === 'Enter' && word) {
      setClips((preClips) => {
        console.log(preClips, word)
        return [...new Set([...preClips, word])]
      })
      setWord('')
    }
  }
  return (
    <div className="input-clip-wrapper">
      <input
        type="text"
        onKeyDown={updateState}
        value={word}
        onChange={(event) => {
          setWord(event.target.value)
        }}
      />
      <div className="clips-holder">
        {clips.map((clip) => (
          <Clip
            label={clip}
            key={clip}
            onDelete={(label) => {
              setClips(removeClip(label))
            }}
          />
        ))}
      </div>
    </div>
  )
}
