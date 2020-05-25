import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import './tag-grid.css'
import TagItem from './TagItem/TagItem'

const GET_TAGS = gql`
  {
    Tag {
      id
      name
      icon
     }
  }
`

const TagGrid = () => {
  const { loading, error, data } = useQuery(GET_TAGS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const tags = data.Tag

  return (
    <div className='grid tags'>
      {tags.map(tag => <TagItem key={tag.id} tag={tag} />)}
    </div>
  )
}

export default TagGrid
