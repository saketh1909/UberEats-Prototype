import React from 'react';
import UberEatsLogo from '../images/UberEatsLogo.png'
class CustomerLogin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                    email:"",
                password:""
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
            <div className="container" style={{width:'25%'}}>
                <div style={{textAlign:'center',marginTop:'25%'}}>
            
            <form onSubmit={this.handleSubmit}>
                <div ><img style={{width:'85%'}} src={UberEatsLogo} alt="Uber Eats"/></div>
                <div >
                    <div style={{marginTop:'3%'}}>
                        <h3>Customer Login</h3>
                    </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="email">Email address : </label></div>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email"/>
                </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="password">Password :</label></div>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="password" placeholder="Enter Password"/>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary btn-lg">Login</button>
                </div>
            </form>
            </div>
            </div>
        </React.Fragment>;
    }
}

export default CustomerLogin;