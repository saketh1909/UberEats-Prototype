import React from 'react'
import { connect } from "react-redux";
import Navbar from "../Components/Navbar.js";
import Axios from 'axios';
class CustomerOrders extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <React.Fragment>
                <Navbar/>
                <h1>Orders Page</h1>
            </React.Fragment>
        )
    }
}

export default CustomerOrders;