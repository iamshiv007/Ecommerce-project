import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Footer } from './component/layout/Footer/Footer';
import { Header } from './component/layout/Header/Header';
import { Loader } from './component/layout/Loader/Loader';
import { LogInSignUp } from './component/User/LogInSignUp';
import { ForgotPassword } from './component/User/ForgotPassword';
import { ResetPassword } from './component/User/ResetPassword';
import { UpdatePassword } from './component/User/UpdatePassword';
import { Profile } from './component/User/Profile';
import { UpdateProfile } from './component/User/UpdateProfile';
import { About } from './component/layout/About/About';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
     <Route exact path='/' component={LogInSignUp} />
     <Route exact path='/profile' component={Profile} />
     </Switch>
    </Router>
  )
}

export default App
