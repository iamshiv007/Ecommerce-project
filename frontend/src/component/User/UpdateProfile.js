import React, { Fragment, useState, useEffect } from 'react'
import { Loader } from '../layout/Loader/Loader'
import { MetaData } from '../layout/MetaData'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, loadUser, upadateProfile } from '../../actions/userAction'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { Face, MailOutline } from '@mui/icons-material'
import './UpdateProfile.css'

export const UpdateProfile = () => {
    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.user)
    
    const { loading, error, isUpdated } = useSelector(state => state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("")

    const updateProfileSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set('name', name)
        myForm.set("email", email)
        myForm.set('avatar', avatar)
        dispatch(upadateProfile(myForm))
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader()

        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isUpdated){
            alert.success("Profile Updated Successfully")
            dispatch(loadUser())

            history.push('/account')

            dispatch({
                type:UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, alert, error, isUpdated, history, user])

  return (
    <Fragment>
        {loading ? 
        <Loader/> 
    : <Fragment>
        <MetaData title="Update Profile" />
        <div className="updateProfileContainer">
            <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
                <form
                className="updateProfileForm"
                encType='multipart/form-data'
                onSubmit={updateProfileSubmit}
                >
                    <div className="upadteProfileName">
                        <Face/>
                        <input 
                        type="text"
                        value={name}
                        placeholder='Name'
                        required
                        name='name'
                        onChange={(e) => setName(e.target.value)}
                         />
                    </div>
                    <div className="updateProfileEmail">
                        <MailOutline/>
                        <input 
                        type="email" 
                        value={email}
                        placeholder="Email"
                        name='email'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div id="updateProfileImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input 
                        type="file"
                        name='avatar'
                        accept='image/*'
                        onChange={updateProfileDataChange}
                         />
                    </div>
                    <input 
                    type="submit" 
                    value="Update"
                    className="updateProfileBtn"
                     />
                </form>
            </div>
        </div>
    </Fragment>
    }
    </Fragment>
  )
}
