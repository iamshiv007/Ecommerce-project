import React, { Fragment, useEffect, useState } from 'react'
import { Loader } from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import { Mouse } from '@mui/icons-material'
import { ProductCard } from './ProductCard'
import { MetaData } from '../layout/MetaData'
import './Home.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export const Home = (props, prevProps) => {

    const alert = useAlert()
    const dispatch = useDispatch()


    const { error, products, loading } = useSelector(state => state.products)

    const { error:userError, user } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct())

        if(userError || !user){
            alert.error("PLease login to access all resources")
        }

    }, [alert, dispatch, error, userError]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {
                        userError || user === null ?
                        <Link to='/login'> 
                            <Button
                                variant="contained"
                                color='primary'
                                style={{ position: "fixed", top: "2%", right: "2%", zIndex: '20' }}
                            >
                                LogIn
                            </Button>
                            </Link> :
                            ""
                    }
                    <MetaData title='ECOMMERCE' />

                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <Mouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
