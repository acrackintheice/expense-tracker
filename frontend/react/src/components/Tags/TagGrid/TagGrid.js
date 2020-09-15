import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import './tag-grid.css'
import TagItem from './TagItem/TagItem'
import TagFooter from './TagHeader/TagFooter'

const GET_TAGS = gql`
    subscription {
      tag {
        id
        name
        icon
       }
    }
`

const DELETE_TAGS = gql`
    mutation delete_tags($names: [String!]) {
        delete_tag(where: {name: {_in: $names}}) {
            affected_rows
        }
    }
`

const TagGrid = () => {
  const [selected, setSelected] = useState([])
  const { loading, error, data } = useSubscription(GET_TAGS)
  const [deleteTag] = useMutation(DELETE_TAGS)

  const selectTag = (tagName) => {
    setSelected([tagName, ...selected])
  }

  const deselectTag = (tagName) => {
    setSelected(selected.filter(t => t !== tagName))
  }

  const deleteSelectedTags = () => {
    if (selected.length > 0) {
      deleteTag({ variables: { names: selected } })
        .then((response) => {
          alert(`The operation deleted ${response.data.delete_tag.affected_rows} tags`)
          setSelected([])
        })
        .catch((error) => alert(error))
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div className='grid'>
      <div className='content'>
        {data.tag.map(tag => <TagItem key={tag.id} tag={tag} selectTag={selectTag} deselectTag={deselectTag} />)}
      </div>
      <TagFooter deleteSelectedTags={deleteSelectedTags} />
    </div>
  )
}

export default TagGrid
