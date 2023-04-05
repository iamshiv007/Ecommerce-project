import { LocalDining, MailOutline } from '@mui/icons-material'
import React, { Fragment, useState, useEffect } from 'react'
import { Loader } from '../layout/Loader/Loader'
import { MetaData } from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, forgotPassword } from '../../actions/userAction'
import './ForgotPassword.css'

export const ForgotPassword = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    )

    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) =>{
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("email", email)
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }

        if(message){
            alert.success(message)
        }
    }, [dispatch, alert, message, error])

  return (
    <Fragment>
        {loading
        ? <Loader/>
    : <Fragment>
        <MetaData title='Forgot Password' />
        <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
                <h2 className="forgotPasswordHeading">Forgot Password</h2>

                <form 
                action="" 
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
                >
                    <div className="forgotPasswordEmail">
                        <MailOutline/>
                        <input 
                        type="email" 
                        name="email" 
                        value={email}
                        placeholder='Email'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                         />
                    </div>

                    <input 
                    type="submit" 
                    value="send"
                    className='forgotPasswordBtn'
                     />
                </form>
            </div>
        </div>
        </Fragment>
        }
    </Fragment>
  )
}
