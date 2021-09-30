import React from 'react'
import Navbar from "../Components/Navbar.js";
import RestaurantCard from './RestaurantCard.js';

import { connect } from "react-redux";
import {getRestaurants} from '../actions/customerDashBoard.js';
class CustomerDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            location:"",
            mode:"",
            restaurantData:[]
        }
    }
    componentDidMount=async ()=>{
        await this.props.getRestaurants();
        console.log(this.props.restaurantData);
    }
    buildCardsStructure = () =>{
        let row=[];
        if(this.props.restaurantData!==undefined){
            const data=this.props.restaurantData;
            for(let i=0;i<data.length;i++){
                if(i%3==0){
                    row.push(<div className=""></div>)
                }
            }
        }
    }
    render(){
        
        
        return(
            <React.Fragment >
                <div style={{backgroundColor:"papayawhip"}}>
                <Navbar/>
                <div >
                    <h1>Order your neighborhood's top spots</h1>
                </div>
                <div className="row">
                    <div className="col-md-3">
                    <input type="text" name="location" value={this.state.location} className="form-control" id="location" aria-describedby="location" placeholder="Enter Delivery Location" required/>
                    </div>
                    <div className="col-md-1" style={{width:"100px",height:"5px"}}>
                    <select className="forn-control" value={this.state.mode} name="mode">
                        <option value="pickup">Pickup</option>
                        <option value="delivery">Delivery</option>
                    </select>
                    </div>
                    <div className="col-md-2">
                    <button type="button" className="btn btn-dark btn-lg">Find Food</button>
                    </div>                
                </div>
                <div>

                </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        restaurantData:state.customerDashBoardReducer.restaurantData
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getRestaurants: () => dispatch(getRestaurants())
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(CustomerDashboard);