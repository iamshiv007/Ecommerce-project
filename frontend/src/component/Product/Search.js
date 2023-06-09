import React, { Fragment, useState } from 'react'
import { MetaData } from '../layout/MetaData';
import './Search.css'
import { useHistory } from 'react-router-dom';

export const Search = () => {
    const [keyword, setKeyword] = useState("");

    const history = useHistory()

    const searchSubmitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/products/${keyword}`)
        } else{
            history.push('/products')
        }
    }
  return (
    <Fragment>
        <MetaData title='Search A Product -- ECOMMERCE' /> 
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input
            type='text'
            placeholder='Search A Product ...'
            onChange={(e) => setKeyword(e.target.value)}
             />
             <input type='submit' value='Search' />
        </form>
    </Fragment>
  )
}
