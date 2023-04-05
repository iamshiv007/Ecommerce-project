import { Instagram, YouTube } from '@mui/icons-material'
import { Avatar, Button, Typography } from '@mui/material'
import React from 'react'
import './AboutSection.css'

export const About = () => {
    const visitInstagram = () => {
        window.location = 'https//instagram.com/iam_shiv_726'
    }
  return (
    <div className='aboutSection'>
        <div></div>
        <div className="aboutSectionGradiant"></div>
        <div className="aboutSectionContainer">
            <Typography component='h1'>About Us</Typography>

        <div>
            <div>
                <Avatar
                src='demo_url'
                style={{ width:'10vmax', height:'10vmax', margin:'2vmax 0'}}
                alt='Founder'
                />
                <Typography>Shivraj Gurjar</Typography>
                <Button onClick={visitInstagram} color='primary' >Visit Instagram</Button>
                <span>
                    This is a demo Ecommerce Website made by @shivraj for
                    showing his Skills and programming understanding.
                </span>
            </div>

            <div className="aboutSectionContainer2">
                <Typography component="h2">Our Brands</Typography>
                <a 
                href="https//youtube.com/shiv"
                target='_blank'
                >
                    <YouTube className='youTubeSvgIcon' />
                </a>
                <a 
                href="https//instagram.com/iam_shiv_726"
                target='_blank'
                >
                    <Instagram className='instagramSvgIcon' />
                </a>
            </div>
        </div>
        </div>
    </div>
  )
}
