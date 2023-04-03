import React from 'react'
import playStore from '../../../images/playStore.png'
import appStore from '../../../images/appStore.png'
import './Footer.css'

export const Footer = () => {
  return (
    <footer id='footer'>

        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playStore} alt="PlayStore" />
            <img src={appStore} alt="AppStore" />
        </div>

        <div className="midFooter">
            <h1>ECOMMERCE</h1>
            <p>High Quality is our first priority</p>

            <p>Copyrights 2023 &copy; iamshiv</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="">Instagram</a>
            <a href="">LinkedIn</a>
            <a href="">GitHub</a>
        </div>

    </footer>
  )
}
