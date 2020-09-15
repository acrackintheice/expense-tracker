import React from 'react'
import './tags.css'
import TagGrid from './TagGrid/TagGrid'
import TagForm from './TagForm/TagForm'

const Tags = () => {
  return (
    <div className='wrapper tags'>
      <TagForm />
      <TagGrid />
    </div>
  )
}

export default Tags
