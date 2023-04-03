import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
import logo from '../../../images/logo.png'

const options = {
    burgerColorHover:"#eb4034",
    logo,
    logoWidth:"20vmax",
    navColor1:"white",
    logoHoverSize:"10vmax",
    logoHoverColor:"#eb4034",
    link1Text:"Home",
    link2Text:"Producs",
    link3Text:"Contact",
    link4Text:"About",
    link1Url:'/',
    link2Url:'/products',
    link3Url:'/contact',
    link4Url:'/about',
    link1Size:"1.3vmax",
    link1Color:"rgba(35, 35, 35, 0.8)",
    nav1JustifyContent:"flex-end",
    nav2JustifyContent:"flex-end",
    nav3JustifyContent:"flex-start",
    nav4JustifyContent:"flex-start",
    link1ColorHover:"#eb4034",
    link1Margin:"1vmax",
    profileIconUrl:'/login',
    profileIconColor:"rgba(35, 35, 35. 0.8)",
    searchIconColor:"rgba(35, 35, 35, 0.8)",
    cartIconColor:"rgba(35, 35, 35, 0.8)",

}

export const Header = () => {
  return (
    <ReactNavbar {...options}/>
  )
}
