import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import { cartReducer } from './reducers/cartReducer'
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderReducer,
    orderDetailReducer
} from './reducers/orderReducer'
import {
    productsReducer,
    newProductReducer,
    productReducer,
    productDetailsReducer,
    newReviewReducer,
    productReviewsReducer,
    reviewReducer
} from './reducers/productReducer'
import {
    userReducer,
    profileReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer
} from './reducers/userReducer'

const reducer = combineReducers({
    user:userReducer,
    allUsers:allUsersReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    userDetails:userDetailsReducer,
    cart:cartReducer,
    myOrder:myOrdersReducer,
    allOrders:allOrdersReducer,
    orderDetails:orderDetailReducer,
    myOrders:myOrdersReducer,
    order:orderReducer,
    products:productsReducer,
    productDetail:productDetailsReducer,
    newProduct:newProductReducer,
    product:productReducer,
    productReview:productReviewsReducer,
    review:reviewReducer,
    newReview:newReviewReducer,
    newOrder:newOrderReducer
})

let initialState = {
    cart:{
        cartItems:localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo:localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {}
    }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store