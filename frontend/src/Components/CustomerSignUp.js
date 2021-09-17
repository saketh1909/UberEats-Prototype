import React from 'react';
import UberEatsLogo from '../images/UberEatsLogo.png'
class CustomerSignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {name:"",
                    email:"",
                password:""};

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
            <div className="container" style={{width:'25%'}}>
                <div style={{textAlign:'center',marginTop:'25%'}}>
            
            <form onSubmit={this.handleSubmit}>
                <div ><img style={{width:'85%'}} src={UberEatsLogo} alt="Uber Eats"/></div>
                <div >
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="name">Name :</label></div>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="name" aria-describedby="name" placeholder="Enter Name" autoFocus/>
                </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="exampleInputEmail1">Email address : </label></div>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email"/>
                </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="exampleInputPassword1">Password :</label></div>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
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

export default CustomerSignUp;