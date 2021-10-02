import React from 'react'
import Navbar from "../Components/Navbar.js";
import RestaurantCard from './RestaurantCard.js';

import { connect } from "react-redux";
import {getRestaurants,searchRestaurants} from '../actions/customerDashBoard.js';
import {Redirect} from 'react-router-dom';
class CustomerDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            location:"",
            mode:"",
            restaurantData:[]
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount=async ()=>{
        await this.props.getRestaurants();
        console.log(this.props.restaurantData);
    }
    handleChange=(e)=>{
        this.setState({location:e.target.value})
    }
    handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(this.state.location);
        await this.props.searchRestaurants(this.state.location);
        console.log("Rest Data",this.props);
    }
    buildCardsStructure = () =>{
        let row=[];
        if(this.props.restaurantData!==undefined){
            const data=this.props.restaurantData;
            for(let i=0;i<data.length;i=i+3){
                if(i+2<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                            <RestaurantCard data={data[i]}/>
                        </div>
                        <div className="col-sm-3">
                            <RestaurantCard data={data[i+1]}/>
                        </div>
                        <div className="col-sm-3">
                            <RestaurantCard data={data[i+2]}/>
                        </div>
                    </div>)
                }else if(i+1<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                            <RestaurantCard data={data[i]}/>
                        </div>
                        <div className="col-sm-3">
                            <RestaurantCard data={data[i+1]}/>
                        </div>
                    </div>)
                }else{
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                            <RestaurantCard data={data[i]}/>
                        </div>
                    </div>)
                }
            }
        }
        return row;
    }
    render(){
        
        if(this.props.customerDetails===undefined){
            return <Redirect to='/'/>
        }
        return(
            <React.Fragment >
                <div  style={{backgroundColor:"papayawhip"}}>
                <Navbar/>
                <div className="row" >
                    <div className="offset-sm-2">
                        <h1>Order your neighborhood's top spots</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 offset-sm-2">
                    <input type="text" name="location" value={this.state.location} onChange={this.handleChange} className="form-control" id="location" aria-describedby="location" placeholder="Enter Delivery Location" required/>
                    </div>
                    <div className="col-md-2">
                    <button type="button" className="btn btn-dark btn-md" onClick={this.handleSubmit}>Find Food</button>
                    </div>                
                </div>
                <div>
                    {this.buildCardsStructure()}
                </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        restaurantData:state.customerDashBoardReducer.restaurantData,
        customerDetails:state.customerLoginReducer.customerLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getRestaurants: () => dispatch(getRestaurants()),
        searchRestaurants: (location) => dispatch(searchRestaurants(location))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(CustomerDashboard);