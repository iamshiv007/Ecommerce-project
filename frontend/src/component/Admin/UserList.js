import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MetaData } from '../layout/MetaData'
import { Sidebar } from './Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import { Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import './ProductList.css'
import { deleteUser, getAllUsers, clearErrors } from '../../actions/userAction'
import { DELETE_USER_RESET } from '../../constants/userConstants'

export const UserList = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, users } = useSelector(state => state.allUsers)

    const { error: deleteError, isDeleted, message } = useSelector(state => state.profile)

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success(message)
            history.push('/admin/users')
            dispatch({ type: DELETE_USER_RESET })
        }

        dispatch(getAllUsers())
    }, [dispatch, alert, error, deleteError, isDeleted, history, message]);

    const columns = [
        { field: 'id', headerName: 'User Id', minWidth: 180, flex: 0.8 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 150,
            flex: 0.3,
            type: 'number',
            cellClassName: (params) => {
                return params.getValue(params.id, 'role') === "Admin"
                    ? 'greenColor'
                    : 'redColor'
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            type: 'number',
            renderCell: (params) => {
                return (
                    <Fragment>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={`/admin/user/${params.getValue(params.id, 'id')}`}  >
                            <Edit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandler(params.getValue(params.id, 'id'))}
                        >
                            <Delete />
                        </Button>
                        </div>
                    </Fragment>
                )
            }
        }
    ]

    const rows = []

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name
            })
        })

    return (
        <Fragment>
            <MetaData title='ALL USERS - Admin' />

            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
}
