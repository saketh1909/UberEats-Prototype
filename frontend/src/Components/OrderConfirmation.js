import React from 'react'
import {Redirect} from 'react-router-dom';
import Navbar from "../Components/Navbar.js";
import { connect } from "react-redux";
import {Table} from 'react-bootstrap';
import Axios from 'axios';
class OrderConfirmation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            subTotal:0,
            tip:2,
            total:0,
            Qty:{},
            orderPlaced:false,
            addresses:[],
            Address:"",
            Description:null,
            AddAddress:"",
        }
    }
    componentDidMount(){
        const {cartItems} =this.props;
        let qty={};
        let subTot=0;
        cartItems.map(item=>{
            subTot+=item.DishPrice*item.Qty;
            qty[item.DishID]=item.Qty;
        })
        let tot=subTot+subTot*(0.2)+6;
        tot=Math.round(tot*100)/100;
        this.setState({Qty:qty,subTotal:subTot,total:tot});
        Axios.get(`http://localhost:3001/getAddress?customerID=${this.props.customerDetails.CustomerID}`)
        .then(res=>{
            console.log(res.data);
            this.setState({addresses:res.data})
        })
        .catch(err=>{
            console.log(err);
        })

    }
    handleChange=(e)=>{
        let qty=this.state.Qty;
        qty[e.target.id]=e.target.value;
        const {cartItems} =this.props;
        let subTot=0;
        cartItems.map(item=>{
            subTot+=item.DishPrice*qty[item.DishID];
        })
        let tot=subTot+subTot*(0.2)+6;
        tot=Math.round(tot*100)/100;
        this.setState({Qty:qty,subTotal:subTot,total:tot});
    }
    handleTip=(e)=>{
        let tip=e.target.value;
        let prev=this.state.tip;
        let total=this.state.total+(tip-prev);
        total=Math.round(total*100)/100;
        this.setState({total:total,tip:tip});
    }
    buildTable=()=>{
        const {cartItems}=this.props;
        let row=[];
        cartItems.map(item=>{
            row.push(
                <tr>
                    <td>
                        <select onChange={this.handleChange} id={item.DishID} value={this.state.Qty[item.DishID]}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </td>
                    <td>
                    <h3>{item.DishName}</h3>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><b>${item.DishPrice}</b></td>
                </tr>
            )

        });


        return row;
    }
    
    handleChanges=(e)=>{
        if(e.target.value==="Pick an Address") return;
        this.setState({[e.target.name]:e.target.value});
    }
    buildAddress=(data)=>{
        if(data.length==0) return;
        let row=[];
        row.push(<option>Pick an Address</option>)
        data.map(address=>{
            row.push(<option>{address.Address}</option>);
        })
       // console.log(data);
       return row;
    }
    addAddress=()=>{
        console.log(this.state.AddAddress);
        if(this.state.AddAddress==="") return;
        const {addresses,AddAddress}=this.state;
        addresses.push(AddAddress);
        const {customerDetails}=this.props;
        let data={
            customerID:customerDetails.CustomerID,
            address:AddAddress
        }
        Axios.post('http://localhost:3001/addAddress',data)
        .then(res=>{
           // console.log("Insertion Successful");
           // console.log(AddAddress,addresses);
            this.setState({Address:AddAddress,addresses:addresses});
        })
        .catch(err=>{
            console.log(err);
        })

        
    }
    placeOrder=()=>{
        if(this.state.Address==="") return;
        let items=0;
        for(let item of this.props.cartItems){
            items+=parseInt(item.Qty);
        }
        let date=new Date().toLocaleString();
        let orderDetails={
            CustomerID:this.props.customerDetails.CustomerID,
            RestaurantID:this.props.cartItems[0].RestaurantID,
            OrderStatus:"New Order",
            Description:this.state.Description,
            NoOfItems:items,
            OrderTotal:this.state.total,
            OrderTime:date,
            OrderPickUp:1,
            OrderDelivery:0,
            OrderPickUpStatus:"Order Received",
            OrderDeliveryStatus:null,
            Address:this.state.Address,
            menu:this.props.cartItems
        }
        Axios.post('http://localhost:3001/placeCustomerOrder',orderDetails)
        .then(res=>{
            console.log("Insertion Successful");
            this.setState({orderPlaced:true});
        })
        .catch(err=>{
            console.log(err);
        })
        console.log(orderDetails);
    }
    render(){
        //console.log("State Vlaues",this.state);
        if(this.props.customerDetails===undefined){
            return <Redirect to='/'/>
        }
        if(this.state.orderPlaced){
            return <Redirect to='/customerDashboard'/>
        }
        return(
            <React.Fragment>
                <Navbar/>
                <div className="container">
                    <div className="row" style={{textAlign:'center'}}>
                        <h1>Order Confirmation</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Your Items</h3>
                            <Table>
                                <tbody>
                                {this.buildTable()}
                                </tbody>
                            </Table>
                            <div className="row" style={{width:"80%"}}>
                            <textarea name="Description" value={this.state.Description} onChange={this.handleChanges} className="form-control" placeholder="Enter a note for the store"></textarea></div>
                            <div className="row form-control" style={{width:"55%",marginTop:"10px"}}>
                                <select name="Address"  value={this.state.Address} onChange={this.handleChanges}>
                                    {this.buildAddress(this.state.addresses)}
                                </select>
                            </div>
                            <div className="row" style={{marginTop:"10px",marginLeft:"-26px"}}>
                                <div className="col-md-8"><textarea name="AddAddress" value={this.state.AddAddress} onChange={this.handleChanges} className="form-control" placeholder="Enter an Address"></textarea></div>
                                <div className="col-md-2"><button type="button" className="btn btn-success" onClick={this.addAddress}>ADD</button></div>
                            </div>
                        </div>
                        <div className="col-md-5" style={{backgroundColor:"#DCDCDC",borderRadius:"10px",fontWeight:"bold"}}>
                            <div className="container">
                                <div className="row" style={{ marginTop:"10px"}}>
                                    <button type="button" className="btn btn-success" onClick={this.placeOrder}>Place order</button>
                                </div>
                                <div className="row" style={{fontSize:"14px"}}>
                                    <p>If you’re not around when the delivery person arrives, they’ll leave your order at the door. 
                                        By placing your order, you agree to take full responsibility for it once it’s delivered.</p>
                                    <hr/>
                                </div>
                                
                                <div className="row">
                                        <div className="col-md-10">SubTotal:</div>
                                        <div className="col-md-1">${this.state.subTotal}</div>
                                </div>
                                <div className="row">
                                        <div className="col-md-10">Taxes & Fees:</div>
                                        <div className="col-md-1">${Math.round(this.state.subTotal*0.2*100)/100}</div>
                                </div>
                                <div className="row">
                                        <div className="col-md-10">Delivery Fee:</div>
                                        <div className="col-md-1">$2.00</div>
                                </div>
                                <div className="row">
                                        <div className="col-md-10">CA Driver Benefits:</div>
                                        <div className="col-md-1">$2.00</div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-md-10">Add a tip</div>
                                    <div className="col-md-1">${this.state.tip}.00</div>
                                </div>
                                <div className="row" style={{width:"140px",marginTop:"5px"}}>
                                    <input className="form-control" type="number" onChange={this.handleTip} width="50px" placeholder="Enter amount"/>
                                </div>
                                <div className="row">
                                    <div className="col-md-10">Total</div>
                                    <div className="col-md-1">${this.state.total}</div>
                                </div>
                                </div>
                            
                        </div>
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    console.log("state",state);
    return {
        customerDetails:state.customerLoginReducer.customerLogin,
        cartItems:state.customerDashBoardReducer.cartItems
    }
}
function mapDispatchToProps(dispatch) {
    return {
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(OrderConfirmation);
