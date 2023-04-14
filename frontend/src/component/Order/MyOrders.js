import React, { Fragment, useEffect } from 'react'
import { Launch } from '@mui/icons-material'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loader } from '../layout/Loader/Loader'
import { DataGrid } from '@mui/x-data-grid'
import { Typography } from '@material-ui/core'
import { MetaData } from '../layout/MetaData'
import { myOrders, clearErrors } from '../../actions/orderAction'
import './MyOrders.css'

export const MyOrders = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, orders } = useSelector(state => state.myOrders)
    const { user } = useSelector(state => state.user)

    const columns = [
        { field: "id", headerName: "Order Id", minWidth: 300, flex: 1 },
        {
            field: 'status',
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, 'status') === 'Delivered' ?
                    'greenColor' :
                    'redColor'
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: 'number',
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "amount",
            headerName: "Amount",
            minWidth: 270,
            flex: 0.5
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
                    <Link to={`/order/${params.getValue(params.id, 'id')}`}>
                        <Launch />
                    </Link>
                )
            }
        }
    ]

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                status: item.orderStatus,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice
            })
        })

    useEffect(() => {
        console.log(orders)
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(myOrders())
    }, [dispatch, alert, error]);

    return (
        <Fragment>
            <MetaData title={`${user.name} - Orders`} />
            {
                loading
                    ? <Loader />
                    : (
                        <div className="myOrdersPage">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                className='myOrdersTable'
                                autoHeight
                            />
                            <Typography id='myOrdersHeading' >{user.name}'s Orders</Typography>
                        </div>
                     )
            } 
        </Fragment>
    )
}
