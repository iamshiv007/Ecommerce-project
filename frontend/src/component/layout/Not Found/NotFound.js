import { Typography } from '@material-ui/core'
import { Error } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

export const NotFound = () => {
  return (

    <div className='pageNotFound'>
        <Error/>
        <Typography>Page Not Found</Typography>
        <Link to='/'>Home</Link>
    </div>

  )
}
