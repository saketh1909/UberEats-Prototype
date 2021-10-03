import React from 'react'
import RestaurantNavbar from './RestaurantNavbar';
import noProfileImage from '../images/noProfileImage.png';
import { connect } from "react-redux";
import firebase  from '../firebaseConfig';
import { restaurantLogout } from '../actions/restaurantLogin';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import { updateRestaurantProfile } from '../actions/restaurantDashBoard';
class RestaurantDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ImageUrl:noProfileImage,
            Name:"",
            Location:"",
            Description:"",
            ContactInfo:"",
            Timings:"",
            Email:"",
            Address:"",
            edit:false,
            changedAttributes:{}
        }
    }
    componentDidMount(){
        const details=this.props.restaurantDetails;
        console.log(details);
        this.setState({
            Name:details.Name,
            Email:details.Email,
            Location:details.Location,
            Description:details.Description,
            ContactInfo:details.ContactInfo,
            Timings:details.Timings,
            Address:details.Address
        });
        if(details.ImageURL!=="" && details.ImageURL!==undefined && details.ImageURL!=null){
            this.setState({ImageUrl:details.ImageURL});
        }
    }
    handleFileUpload = async(e) =>{
        const file=e.target.files[0];
        const imagesRef=firebase.storage().ref("RestaurantImages").child(this.props.restaurantDetails.RestaurantID);
        await imagesRef.put(file);
        const details=this.props.restaurantDetails;
        imagesRef.getDownloadURL()
        .then(url=>{
            this.setState({ImageUrl:url});
            let data={
               RestaurantID:details.RestaurantID
            };
            data["ImageURL"]=url;
            details["ImageURL"]=url;
            Axios.post('http://localhost:3001/updateRestaurantProfile',data)
            .then(async (res)=>{
                console.log("Update Successful");
                this.props.updateRestaurantProfile(details);
            })
            .catch(err=>{
                console.log("Error");
            })
        });
    }
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value,changedAttributes:{...this.state.changedAttributes,[e.target.name]:true}});
    }
    editClicked = () =>{
        this.setState({edit:true});
    }
    saveClicked = async() =>{
        let details=this.props.restaurantDetails;
        let data={
            RestaurantID:details.RestaurantID
        };
        for(const[key,value] of Object.entries(this.state.changedAttributes)){
            data[key]=this.state[key];
            details[key]=this.state[key];
        }
        //console.log("Changed",data);
        await Axios.post('http://localhost:3001/updateRestaurantProfile',data)
            .then(async (res)=>{
                //console.log("Update Successful");
                this.props.updateRestaurantProfile(details);
                this.setState({edit:false,changedAttributes:{}});
            })
            .catch(err=>{
                console.log("Error");
            })
    }

    render(){
        if(this.props.restaurantDetails===undefined){
            return <Redirect to='/'/>
        }
        return(
            <React.Fragment>
                <RestaurantNavbar/>
                <div className="row" style={{textAlign:'center'}}>
                    <h1 >Restaurant Profile</h1>
                </div>
                <div className="row" style={{marginTop:"3%"}}>
                    <div className="col-md-2 offset-md-2">
                        <div className="row" style={{width:"230px",height:"170px"}}>
                            <img src={this.state.ImageUrl} alt="Profile"/>
                        </div>
                        <div className="row" style={{width:"80%",alignItems:"center",marginTop:"50px",marginLeft:"2.5%"}}>
                            <input
                            ref="fileInput"
                            onChange={this.handleFileUpload}
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            // multiple={false}
                            />
                            <button className="btn btn-primary" onClick={() => this.refs.fileInput.click()}>Upload Image</button>
                        </div>
                    </div>
                    <div className="col-md-7 offset-md-1">
                    <table>
                            <tbody>
                                <tr>
                                    <td><h3>Basic Information</h3></td>
                                </tr>
                                <tr>
                                    <td>Restaurant Name</td>
                                    <td>:</td>
                                    <textarea name="Name" cols={30} rows={2} disabled={!this.state.edit} value={this.state.Name} onChange={this.handleChange}/>
                                       
                                </tr>
                                <tr>
                                    <td>Restaurant Location</td>
                                    <td>:</td>
                                        <input type="text" name="Location" disabled={!this.state.edit} value={this.state.Location} onChange={this.handleChange}/>
                                        
                                </tr>
                                <tr>
                                    <td>Restaurant Address</td>
                                    <td>:</td>
                                        <textarea name="Address" disabled={!this.state.edit} cols={30} rows={3} value={this.state.Address} onChange={this.handleChange}/>
                                        
                                </tr>
                                <tr rowspan="3">
                                    <td>Restaurant Description</td>
                                    <td>:</td>
                                    
                                    <textarea name="Description" disabled={!this.state.edit} cols={75} rows={5} value={this.state.Description} onChange={this.handleChange}/>
                                        
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                        <input type="text" disabled={!this.state.edit} name="Email" value={this.state.Email} onChange={this.handleChange}/>
                                       
                                </tr>
                                <tr>
                                    <td>Contact Information</td>
                                    <td>:</td>
                                        <input type="text" disabled={!this.state.edit} name="ContactInfo" value={this.state.ContactInfo} onChange={this.handleChange}/>
                                       
                                </tr>
                                <tr>
                                    <td>Timings</td>
                                    <td>:</td>
                                        <input type="text" disabled={!this.state.edit} name="Timings" value={this.state.Timings} onChange={this.handleChange}/>
                                  
                                </tr>
                                <tr style={{marginTop:"10px"}}>
                                    <td><button type="button" className="btn btn-primary" onClick={this.editClicked}>Edit</button></td>
                                    <td><button type="button" disabled={!Object.keys(this.state.changedAttributes).length>0} className="btn btn-success" onClick={this.saveClicked}>Save</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    //console.log(state);
    return {
        restaurantDetails:state.restaurantLoginReducer.restaurantLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateRestaurantProfile:(data)=>dispatch(updateRestaurantProfile(data))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(RestaurantDashboard);