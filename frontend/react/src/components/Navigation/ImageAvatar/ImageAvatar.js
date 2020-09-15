import React from 'react'
import './image-avatar.css'
import { Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const ImageAvatar = ({ image }) => (
  <div className='image-avatar'>
    <Image src={image} avatar />
  </div>
)

ImageAvatar.propTypes = {
  image: PropTypes.string
}

export default ImageAvatar
