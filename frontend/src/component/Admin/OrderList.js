import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MetaData } from '../layout/MetaData'
import { Sidebar } from './Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import { clearErrors, getAllOrders } from '../../actions/orderAction'
import { Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import './ProductList.css'
import { deleteOrder } from '../../actions/orderAction'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

export const OrderList = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, orders } = useSelector(state => state.allOrders)

    const { error:deleteError, isDeleted } = useSelector(state => state.order)

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }        

        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success("Order Deleted Successfully")
            history.push('/admin/orders')
            dispatch({type:DELETE_ORDER_RESET})
        }

        dispatch(getAllOrders())
    }, [dispatch, alert, error, deleteError, isDeleted, history]);

    const columns = [
        { field:'id', headerName:'Order Id', minWidth:300, flex:1},

        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.5,
            cellClassName : (params) => {
                return params.getValue(params.id, 'status') === 'Delivered'
                ? 'greenColor'
                : 'redColor'
            }
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:'number',
            minWidth:150,
            flex:0.4
        },
        {
            field:"amount",
            headerName:"Amount",
            minWidth:270,
            flex:0.5
        },
        {
            field:"actions",
            headerName:"Actions",
            minWidth:150,
            flex:0.3,
            sortable:false,
            type:'number',
            renderCell: (params) => {
                return (
                    <Fragment>
                        <div style={{display:'flex', alignItems:'center'}}>
                        <Link to={`/admin/order/${params.getValue(params.id, 'id')}`}  > 
                        <Edit/>
                        </Link>

                        <Button
                        onClick={() => 
                        deleteOrderHandler(params.getValue(params.id, 'id'))}
                        >
                            <Delete/>
                        </Button>
                        </div>
                    </Fragment>
                )
            }
        }
    ]

    const rows = []

    orders &&
    orders.forEach((item) => {
        rows.push({
            id:item._id,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
            status:item.orderStatus
        })
    })

  return (
    <Fragment>
        <MetaData title='ALL ORDERS - Admin' />

        <div className="dashboard">
            <Sidebar/>

            <div className="productListContainer">
                <h1 id="productListHeading">ALL ORDERS</h1>

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
