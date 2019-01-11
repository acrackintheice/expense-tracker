import React from 'react'
import { Image } from 'semantic-ui-react'

const ImageExampleAvatar = (props) => (
  <div>
    <Image src={props.image} avatar />
    <span>{props.username}</span>
  </div>
)

export default ImageExampleAvatar