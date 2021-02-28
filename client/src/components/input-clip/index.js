import React, { useState } from 'react'
import Clip from '../clip'
import './index.css'

const removeClip = (labelToBeRemovedFromClip) => (clips) =>
  clips.filter((clip) => clip !== labelToBeRemovedFromClip)

export default function InputClip({
  setClips = () => {},
  clips,
  placeholder = '',
  noClip = '',
}) {
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
        placeholder={placeholder}
      />
      <div className="clips-holder">
        {/* https://stackoverflow.com/a/46057536/5277189 */}
        {clips.length ? (
          [...clips].reverse().map((clip) => (
            <Clip
              label={clip}
              key={clip}
              onDelete={(label) => {
                setClips(removeClip(label))
              }}
            />
          ))
        ) : (
          <span>{noClip}</span>
        )}
      </div>
    </div>
  )
}
