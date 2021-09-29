import React from 'react';
import UberEatsLogo from '../images/UberEatsLogo.png'
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
    
      handleSubmit(event) {
        event.preventDefault();
      }

    render(){
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
                    <input type="email" name="location" value={this.state.location} onChange={this.handleChange} className="form-control" id="location" placeholder="Enter Location"/>
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

export default RestaurantSignUp;