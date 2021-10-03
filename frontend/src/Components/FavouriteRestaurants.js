import React from 'react'
import { connect } from "react-redux";
import Navbar from "../Components/Navbar.js";
import Axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage} from 'mdb-react-ui-kit';
import noProfileImage from '../images/noProfileImage.png';
class FavouriteRestaurants extends React.Component{
    constructor(props){
        super(props);
        this.state={
            favRestaurants:[]
        }
    }
    componentDidMount(){
        console.log("Here");
        const {customerDetails}=this.props;
        console.log(customerDetails);
        Axios.get(`http://localhost:3001/getFavouriteRestaurants?customerID=${customerDetails.CustomerID}`)
        .then(res=>{
            console.log(res.data);
            this.setState({favRestaurants:res.data});
        })
    }
    buildCardStructure = (data) =>{
        console.log("Call check",data);
        let row=[];
        if(data!==undefined && data.length>0){
            for(let i=0;i<data.length;i=i+3){
                if(i+2<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-md-3 offset-md-2">
                            {this.restCard(data[i])}
                        </div>
                        <div className="col-md-3">
                        {this.restCard(data[i+1])}
                        </div>
                        <div className="col-md-3">
                        {this.restCard(data[i+2])}
                        </div>
                    </div>)
                }else if(i+1<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-md-3 offset-md-2">
                        {this.restCard(data[i])}
                        </div>
                        <div className="col-md-3">
                        {this.restCard(data[i+1])}
                        </div>
                    </div>)
                }else{
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-md-3 offset-md-2">
                        {this.restCard(data[i])}
                        </div>
                    </div>)
                }
            }
        }
        console.log("row",row);
        return row;
    }
    restCard=(data)=>{
        if(data.ImageURl==="" || data.ImageURL===null || data.ImageURL===undefined){
            data.ImageURL=noProfileImage;
        }
        return (<MDBCard style={{ maxWidth: '48rem' }}>
                    <MDBCardImage id={data.RestaurantID}  src={data.ImageURL} position='top' alt='Image' style={{height:"150px"}} />
                    <MDBCardBody id={data.RestaurantID}  style={{color:"black"}}>
                        <MDBCardTitle  id={data.RestaurantID} style={{textAlign:"center"}}>{data.Name}</MDBCardTitle>
                        <MDBCardText id={data.RestaurantID}  style={{fontSize:"15px"}}>
                            Timings:{data.Timings}
                            <span id={data.RestaurantID}>Location:{data.Location}</span>
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>)
    }
    render(){
        return (<React.Fragment>
                <Navbar/>
                <div className="container" style={{textAlign:"center"}}>
                <h1>Favourite Restaurants</h1>
                </div>
                <div className="container">
                    {this.buildCardStructure(this.state.favRestaurants)}
                </div>
                </React.Fragment>
                )
    }
}
const mapStateToProps = (state) =>{
    return {
        customerDetails:state.customerLoginReducer.customerLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(FavouriteRestaurants);
