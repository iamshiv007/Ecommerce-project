import React, { Fragment, useState, useEffect } from 'react'
import { Loader } from '../layout/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import './ResetPassword.css'
import { clearErrors, upadatePassword } from '../../actions/userAction'
import { Lock, LockOpen, VpnKey } from '@mui/icons-material'
import { MetaData } from '../layout/MetaData'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import './UpdatePassword.css'

export const UpdatePassword = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, isUpdated, loading } = useSelector(
        (state) => state.profile
    )

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set('oldPassword', oldPassword)
        myForm.set('newPassword', newPassword)
        myForm.set('confirmPassword', confirmPassword)

        dispatch(upadatePassword(myForm))
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isUpdated){
            alert.success('Password Updated Successfully')

            history.push('/account')

            dispatch({
                type:UPDATE_PASSWORD_RESET
            })
        }
    }, [error, alert, dispatch, history, isUpdated])
  return (
    <Fragment>
        {
            loading
            ?<Loader/>
            :<Fragment>
                <MetaData title='Change Password' />
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <h2 className="updatePasswordHeading">Update Profile</h2>
                        <form 
                        onSubmit={updatePasswordSubmit}
                        className="updatePasswordForm"
                        >
                            <div className="">
                                <VpnKey/>
                                <input 
                                type="password" 
                                placeholder='Old Password'
                                value={oldPassword}
                                required
                                onChange={(e) => setOldPassword(e.target.value)}
                                 />
                            </div>
                            <div className="">
                                <LockOpen/>
                                <input 
                                type="password" 
                                placeholder='New Password'
                                value={newPassword}
                                required
                                onChange={(e) => setNewPassword(e.target.value)}
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
                            className='updatePasswordBtn'
                             />
                        </form>
                    </div>
                </div>
            </Fragment>
        }
    </Fragment>
  )
}
