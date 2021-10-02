//import './App.css';
import CustomerSignUp from './Components/CustomerSignUp';
import RestaurantSignUp from './Components/RestaurantSignUp';
import CustomerLogin from "./Components/CustomerLogin";
import RestaurantLogin  from "./Components/RestaurantLogin";
import CustomerDashboard from "./Components/CustomerDashboard";
import CustomerProfile from './Components/CustomerProfile';
import Home from './Components/Home';
import RestaurantDashboard from './Components/RestaurantDashboard';
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
            <Route path='/customerProfile' component={CustomerProfile} />
            <Route path='/restaurantDashboard' component={RestaurantDashboard}/>
          </Switch>
        </Router>
      </header>
    </>
  );
}

export default App;
