import React from 'react'
import subway from '../images/subway.jpg'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage} from 'mdb-react-ui-kit';
import { connect } from "react-redux";
import noProfileImage from '../images/noProfileImage.png';
import { viewRestaurantPage,updateFavouriteRestaurants,setFoodType } from '../actions/customerDashBoard';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
class RestaurantCard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            restaurantData:{},
            clicked:false,
            favClicked:false
        }
    }
    itemClicked=(e)=>{
        e.stopPropagation();
        
        //console.log(this.props);
        if(this.props.foodType===undefined){
            this.props.viewRestaurantPage(this.state.restaurantData);
        }else{
            let data=this.state.restaurantData;
            data["foodType"]=this.props.foodType;
            this.props.viewRestaurantPage(data);
            this.props.setFoodType(undefined);
        }
        this.setState({clicked:true});
    }
    add=(e)=>{
       
        //console.log("Clicked");
        let postData={
            customerID:this.props.customerDetails.CustomerID,
            restaurantID:e.target.id
        }
        this.setState({favClicked:true});
       // console.log(postData);
        Axios.post('http://localhost:3001/addToFavourites',postData)
        .then(res=>{
            console.log("Insertion Successful");
            this.props.updateFavouriteRestaurants(e.target.id);
        })
        .catch(err=>{
            console.log(err);
        })
        e.stopPropagation();
    }
    render(){
        const {favRestaurants}=this.props;
       // console.log("Card",favRestaurants);
       // console.log("Props",this.props);
        if(this.state.clicked){
            return <Redirect to='/restaurantViewPage'/>
        }
        const data=this.props.data;
        if(data!==undefined && Object.keys(this.state.restaurantData).length===0){
            this.setState({restaurantData:data});
        }
        //console.log(data.ImageURL);
        if(data.ImageURl==="" || data.ImageURL===null || data.ImageURL===undefined){
            data.ImageURL=noProfileImage;
        }
        return (
            <React.Fragment>
                {data!==undefined?<div ><MDBCard style={{ maxWidth: '22rem' }}>
                    <MDBCardImage id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}} src={data.ImageURL} position='top' alt='Image' style={{height:"150px"}} />
                    <MDBCardBody id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}} style={{color:"black"}}>
                        <MDBCardTitle  id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}} style={{textAlign:"center"}}>{data.Name}</MDBCardTitle>
                        <MDBCardText id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}}  style={{fontSize:"15px"}}>
                            Timings:{data.Timings}
                            <span id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}}>Location:{data.Location}</span>
                            <div>
                                <button type="button" className="btn btn-primary" id={data.RestaurantID} onClick={(e)=>{this.add(e)}}  disabled={favRestaurants[data.RestaurantID]!==undefined || this.state.favClicked}>Add To Favourites</button>
                            </div>
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard></div>:null}
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        customerDetails:state.customerLoginReducer.customerLogin,
        foodType:state.customerDashBoardReducer.foodType
    }
}
function mapDispatchToProps(dispatch) {
    return {
        viewRestaurantPage:(data)=>dispatch(viewRestaurantPage(data)),
        updateFavouriteRestaurants:(data)=>dispatch(updateFavouriteRestaurants(data)),
        setFoodType:(type)=>dispatch(setFoodType(type))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(RestaurantCard);
