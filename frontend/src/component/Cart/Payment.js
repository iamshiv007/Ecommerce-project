import React, { Fragment, useEffect, useRef } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { clearErrors, createOrder } from '../../actions/orderAction'
import { CheckoutSteps } from './CheckoutSteps'
import { Typography } from '@material-ui/core'
import { CreditCard, Event, VpnKey } from '@mui/icons-material'
import './Payment.css'
import axios from 'axios'
import { MetaData } from '../layout/MetaData'
import { useHistory } from 'react-router-dom'

export const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const dispatch = useDispatch()
    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const payBtn = useRef()
    const history = useHistory()

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    const { error } = useSelector(state => state.newOrder)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subTotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }

    const PORT = 'http://localhost:5000'

    const submitHandler = async (e) => {
        e.preventDefault()

        payBtn.current.disabled = true

        try {

            const { data } = await axios.post(`${PORT}/api/v1/payment/process`, paymentData)

            const client_secret = data.client_secret

            if (!stripe || !elements) return

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }
                }
            })

            if (result.error) {
                payBtn.current.disabled = false

                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(createOrder(order))

                    history.push('/success')
                } else {
                    alert.error("There's some issue while processing payment")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false
            alert.error(error.response.data.message)
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            <MetaData title='Payment' />

            <CheckoutSteps activeStep={2} />

            <div className="paymentContainer">
                <form
                    onSubmit={(e) => submitHandler(e)}
                    className="paymentForm">
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCard />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <Event />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <VpnKey />
                        <CardCvcElement className='paymentInput' />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className='paymentFormBtn'
                    />
                </form>
            </div>
        </Fragment>
    )
}
