import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "./component/layout/Footer/Footer";
import { Header } from "./component/layout/Header/Header";
import { LogInSignUp } from "./component/User/LogInSignUp";
import { ForgotPassword } from "./component/User/ForgotPassword";
import { ResetPassword } from "./component/User/ResetPassword";
import { UpdatePassword } from "./component/User/UpdatePassword";
import { Profile } from "./component/User/Profile";
import { UpdateProfile } from "./component/User/UpdateProfile";
import { About } from "./component/layout/About/About";
import { NewProduct } from "./component/Admin/NewProduct";
import { UpdateProduct } from "./component/Admin/UpdateProduct";
import { ProductList } from "./component/Admin/ProductList";
import { UserList } from "./component/Admin/UserList";
import { OrderList } from "./component/Admin/OrderList";
import { useSelector } from "react-redux";
import WebFont from "webfontloader";
import { loadUser } from "./actions/userAction";
import store from "./store";
import { UserOptions } from "./component/layout/Header/UserOptions";
import { Home } from "./component/Home/Home";
import { ProtectedRoute } from "./component/Route/ProtectedRoute";
import { Dashboard } from "./component/Admin/Dashboard";
import { ProductDetails } from "./component/Product/ProductDetails";
import { Contact } from "./component/layout/Contact/Contact";
import { NotFound } from "./component/layout/Not Found/NotFound";
import { Cart } from "./component/Cart/Cart";
import { OrderSuccess } from "./component/Cart/OrderSuccess";
import { Shipping } from "./component/Cart/Shipping";
import { Products } from "./component/Product/Products";
import { Search } from "./component/Product/Search";
import { MyOrders } from "./component/Order/MyOrders";
import { OrderDetails } from "./component/Order/OrderDetails";
import { ConfirmOrder } from "./component/Cart/ConfirmOrder";
import { ProcessOrder } from "./component/Admin/ProcessOrder";
import { UpdateUser } from "./component/Admin/UpdateUser";
import { ProductReviews } from "./component/Admin/ProductReviews";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Payment } from "./component/Cart/Payment";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('')

  async function getStripeApiKey (){
    const { data } = await axios.get(`http://localhost:5000/api/v1/stripeApiKey`)

    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    getStripeApiKey()
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      {isAuthenticated && <Header />}

      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:keyword" component={Products} />

        <Route exact path="/search" component={Search} />

        <Route exact path="/contact" component={Contact} />

        <Route exact path="/about" component={About} />

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={LogInSignUp} />

        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute
          exact
          isAdmin={true}
          component={Dashboard}
          path="/admin/dashboard"
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          component={ProductList}
          path="/admin/products"
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          component={NewProduct}
          path="/admin/product"
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          component={UpdateProduct}
          path="/admin/product/:id"
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          component={OrderList}
          path="/admin/orders"
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          component={ProcessOrder}
          path="/admin/order/:id"
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          component={UserList}
          path="/admin/users"
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          component={UpdateUser}
          path="/admin/user/:id"
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          component={ProductReviews}
          path="/admin/reviews"
        />

        {/* Not Found */}
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;