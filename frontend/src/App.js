//import './App.css';
// import CustomerSignUp from './Components/CustomerSignUp';
// import RestaurantSignUp from './Components/RestaurantSignUp';
// import CustomerLogin from "./Components/CustomerLogin";
// import RestaurantLogin  from "./Components/RestaurantLogin";
import Navbar from "./Components/Navbar";
import {BrowserRouter as Router ,Switch ,Route} from 'react-router-dom';
function App() {
  return (
    <>
      <header>
        {/* <CustomerSignUp/> */}
        {/* <RestaurantSignUp/> */}
        {/* <SideNavbar/> */}
        
        <Router>
          <Navbar/>
          <Switch>
            <Route path='/'/>
          </Switch>
        </Router>
      </header>
    </>
  );
}

export default App;
