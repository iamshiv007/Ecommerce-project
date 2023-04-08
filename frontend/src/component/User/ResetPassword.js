import React, { Fragment, useState, useEffect } from 'react'
import { Loader } from '../layout/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import './ResetPassword.css'
import { resetPassword, clearErrors } from '../../actions/userAction'
import { Lock, LockOpen } from '@mui/icons-material'
import { MetaData } from '../layout/MetaData'
import './ResetPassword.css'
import { useHistory, useParams } from 'react-router-dom'

export const ResetPassword = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const history = useHistory()

    const { token } = useParams()

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    )

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set('password', password)
        myForm.set('confirmPassword', confirmPassword)

        dispatch(resetPassword(token, myForm))
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(success){
            alert.success('Password Updated Successfully')

            history.push('/login')
        }
    }, [error, alert, dispatch, history, success])
  return (
    <Fragment>
        {
            loading
            ?<Loader/>
            :<Fragment>
                <MetaData title='Change Password' />
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h2 className="resetPasswordHeading">Update Profile</h2>
                        <form 
                        onSubmit={resetPasswordSubmit}
                        className="resetPasswordForm"
                        >
                            <div className="">
                                <LockOpen/>
                                <input 
                                type="password" 
                                placeholder='New Password'
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                 />
                            </div>
                            <div className="loginPassword">
                                <Lock/>
                                <input 
                                type="password" 
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                 />
                            </div>
                            <input 
                            type="submit" 
                            value="Update"
                            className='resetPasswordBtn'
                             />
                        </form>
                    </div>
                </div>
            </Fragment>
        }
    </Fragment>
  )
}
