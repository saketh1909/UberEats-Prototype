import React from 'react';
import UberEatsLogo from '../images/UberEatsLogo.png';
import { connect } from "react-redux";
import {restaurantSignup} from '../actions/restaurantLogin.js';
import {Redirect} from 'react-router-dom';
class RestaurantSignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {restaurantName:"",
                    email:"",
                password:"",
                location:""
            };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
      }
    
      handleSubmit= async(event) => {
        event.preventDefault();
        let restDetails={
            name:this.state.restaurantName,
            password:this.state.password,
            email:this.state.email,
            location:this.state.location
        }
        await this.props.signup(restDetails);
        console.log("Check This",this.props);
      }

    render(){
        if(this.props.restaurantSignup!==undefined && this.props.restaurantSignup==="Signup Sucessful"){
            return <Redirect to='/restaurantLogin'/>
        }
        return <React.Fragment>
            <div className="container" style={{width:'20%'}}>
                <div style={{textAlign:'center',marginTop:'25%'}}>
            
            <form onSubmit={this.handleSubmit}>
                <div ><img style={{width:'85%'}} src={UberEatsLogo} alt="Uber Eats"/></div>
                <div >
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="restaurantName">Name :</label></div>
                    <input type="text" name="restaurantName" value={this.state.restaurantName} onChange={this.handleChange} className="form-control" id="name" aria-describedby="restaurantName" placeholder="Enter Restaurant Name" autoFocus/>
                </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="email">Email address : </label></div>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email"/>
                </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="password">Password :</label></div>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="password" placeholder="Enter Password"/>
                </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="location">Location : </label></div>
                    <input type="text" name="location" value={this.state.location} onChange={this.handleChange} className="form-control" id="location" placeholder="Enter Location"/>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                </div>
            </form>
            </div>
            </div>
        </React.Fragment>;
    }
}
const mapStateToProps = (state) =>{
    console.log("State",state);
    return {
        restaurantSignup:state.restaurantLoginReducer.restaurantSignup
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signup: data => dispatch(restaurantSignup(data))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(RestaurantSignUp);