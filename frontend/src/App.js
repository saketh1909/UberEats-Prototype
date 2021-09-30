//import './App.css';
import CustomerSignUp from './Components/CustomerSignUp';
import RestaurantSignUp from './Components/RestaurantSignUp';
import CustomerLogin from "./Components/CustomerLogin";
import RestaurantLogin  from "./Components/RestaurantLogin";
import CustomerDashboard from "./Components/CustomerDashboard";
import Home from './Components/Home';
import {BrowserRouter as Router ,Switch ,Route} from 'react-router-dom';
function App() {
  return (
    <>
      <header>
        <Router>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/customerLogin' component={CustomerLogin}/>
            <Route path='/customerSignup' component={CustomerSignUp} />
            <Route path='/customerDashboard' component={CustomerDashboard}/>
            <Route path='/restaurantLogin' component={RestaurantLogin}/>
            <Route path='/restaurantSignup' component={RestaurantSignUp} />
          </Switch>
        </Router>
      </header>
    </>
  );
}

export default App;
