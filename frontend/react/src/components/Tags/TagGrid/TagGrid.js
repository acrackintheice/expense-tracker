import React from 'react'
import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks'
import './tag-grid.css'
import TagItem from './TagItem/TagItem'

const GET_TAGS = gql`
    subscription {
      tag {
        id
        name
        icon
       }
    }
`

const TagGrid = () => {
  const { loading, error, data } = useSubscription(GET_TAGS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const tags = data.tag

  return (
    <div className='grid tags'>
      {tags.map(tag => <TagItem key={tag.id} tag={tag} />)}
    </div>
  )
}

export default TagGrid
