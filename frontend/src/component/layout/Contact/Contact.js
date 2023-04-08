import { Button } from '@material-ui/core'
import React from 'react'
import './Contact.css'

export const Contact = () => {
  return (
    <div className="contactContainer">
        <a className='mailBtn' href='mailto:iamshiv20032003@gmail.com'>
        <Button>Contact : iamshiv20032003@gmail.com</Button>
        </a>
    </div>
  )
}
