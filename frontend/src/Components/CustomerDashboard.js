import React from 'react'
import Navbar from "../Components/Navbar.js";
import RestaurantCard from './RestaurantCard.js';
import noProfileImage from '../images/noProfileImage.png';
import { connect } from "react-redux";
import {getRestaurants,searchRestaurants,updateFavouriteRestaurants} from '../actions/customerDashBoard.js';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
class CustomerDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            location:"",
            mode:"",
            restaurantData:[],
            favRestaurants:{}
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount=async ()=>{
        await this.props.getRestaurants();
        console.log(this.props.restaurantData);
        const {customerDetails}=this.props;
        Axios.get(`http://localhost:3001/getFavouriteRestaurants?customerID=${customerDetails.CustomerID}`)
        .then(res=>{
            console.log(res.data);
            let id={};
            res.data.map((rest)=>{
                id[rest.RestaurantID]=true;
            })
            this.setState({favRestaurants:id});
        })
    }
   
    handleChange=(e)=>{
        this.setState({location:e.target.value});
    }
    handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(this.state.location);
        await this.props.searchRestaurants(this.state.location);
        console.log("Rest Data",this.props);
    }
    buildCardsStructure = () =>{
        console.log("Hereeeeeee",this.state.favRestaurants,this.props.restaurantData);
        let row=[];
        if(this.props.restaurantData!==undefined){
            const data=this.props.restaurantData;
            console.log("Inside",data);
            for(let i=0;i<data.length;i=i+3){
                if(i+2<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                            <RestaurantCard data={data[i]} favRestaurants={this.state.favRestaurants} />
                        </div>
                        <div className="col-sm-3">
                            <RestaurantCard data={data[i+1]} favRestaurants={this.state.favRestaurants}  />
                        </div>
                        <div className="col-sm-3">
                            <RestaurantCard data={data[i+2]} favRestaurants={this.state.favRestaurants}  />
                        </div>
                    </div>)
                }else if(i+1<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}} >
                        <div className="col-sm-3 offset-sm-2">
                            <RestaurantCard data={data[i]} favRestaurants={this.state.favRestaurants}  />
                        </div>
                        <div className="col-sm-3">
                            <RestaurantCard data={data[i+1]} favRestaurants={this.state.favRestaurants}  />
                        </div>
                    </div>)
                }else{
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                            <RestaurantCard data={data[i]} favRestaurants={this.state.favRestaurants}  />
                        </div>
                    </div>)
                }
            }
        }
        return row;
    }
    addToFavourites=()=>{
        let restaurants=this.state.favRestaurants;
        restaurants[this.props.favRestaurants]=true;
        this.props.updateFavouriteRestaurants();
        console.log("Check this asd",restaurants);
        this.setState({favRestaurants:restaurants});
        


    }
    render(){
        console.log("Updated",this.state.favRestaurants);
        if(this.props.customerDetails===undefined){
            return <Redirect to='/'/>
        }
        if(this.props.favRestaurants!==undefined){
            this.addToFavourites();
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
    console.log("state",state);
    return {
        restaurantData:state.customerDashBoardReducer.restaurantData,
        favRestaurants:state.customerDashBoardReducer.favRestaurants,
        customerDetails:state.customerLoginReducer.customerLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getRestaurants: () => dispatch(getRestaurants()),
        searchRestaurants: (location) => dispatch(searchRestaurants(location)),
        updateFavouriteRestaurants:(data)=>dispatch(updateFavouriteRestaurants(data))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(CustomerDashboard);