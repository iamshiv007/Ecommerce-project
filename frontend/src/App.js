import './App.css';
import { Footer } from './component/layout/Footer/Footer';
import { Header } from './component/layout/Header/Header';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
     <div><Header/></div>
     <div><Footer/></div>
     </Switch>
    </Router>
  );
}

export default App;
