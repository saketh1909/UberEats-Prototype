//import './App.css';
import CustomerSignUp from './Components/CustomerSignUp';
import RestaurantSignUp from './Components/RestaurantSignUp';
import CustomerLogin from "./Components/CustomerLogin";
import RestaurantLogin  from "./Components/RestaurantLogin";
import CustomerDashboard from "./Components/CustomerDashboard";
import CustomerProfile from './Components/CustomerProfile';
import Home from './Components/Home';
import RestaurantDashboard from './Components/RestaurantDashboard';
import RestaurantMenu from './Components/RestaurantMenu';
import RestaurantOrders from './Components/RestaurantOrders';
import RestaurantViewPage from './Components/RestaurantViewPage';
import FavouriteRestaurants from './Components/FavouriteRestaurants';
import CustomerOrders from './Components/CustomerOrders';
import OrderConfirmation from './Components/OrderConfirmation';
import {BrowserRouter as Router ,Switch ,Route} from 'react-router-dom';
function App() {
  return (
    <div>
      <header>
        <Router>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/customerLogin' component={CustomerLogin}/>
            <Route path='/customerSignup' component={CustomerSignUp} />
            <Route path='/customerDashboard' component={CustomerDashboard}/>
            <Route path='/restaurantViewPage'component={RestaurantViewPage}/>
            <Route path='/restaurantLogin' component={RestaurantLogin}/>
            <Route path='/restaurantSignup' component={RestaurantSignUp} />
            <Route path='/customerProfile' component={CustomerProfile} />
            <Route path='/restaurantDashboard' component={RestaurantDashboard}/>
            <Route path='/restaurantMenu' component={RestaurantMenu}/>
            <Route path='/restaurantOrders' component={RestaurantOrders}/>
            <Route path='/favouriteRestaurants' component={FavouriteRestaurants}/>
            <Route path='/customerOrders' component={CustomerOrders}/>
            <Route path='/customerOrderConfirmation'component={OrderConfirmation}/>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
