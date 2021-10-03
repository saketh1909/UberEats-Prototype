import React from 'react'
import Axios from 'axios';
import { connect } from "react-redux";
import {Modal,Button} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import RestaurantNavbar from './RestaurantNavbar';
import noProfileImage from '../images/noProfileImage.png';
import {Table} from 'react-bootstrap'
import {Redirect} from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
const pickUpStatus=["Order Received","Preparing","Pickup Ready","Picked up"];
const deliveryStatus=["Order Received","Preparing","On the way","Delivered"];
class RestaurantOrders extends React.Component{
    constructor(props){
        super(props);
        this.state={
            orders:[],
            showProfile:false,
            showUpdateStatus:false,
            showMenu:false,
            OrderID:null,
            OrderPickUpStatus:null,
            OrderDeliveryStatus:null,
            saveEnable:false,
            edited:false,
            order:null,
            orderMenu:[]

        }
    }
    componentDidMount(){
        const {RestaurantID}=this.props.restaurantDetails;
        Axios.get(`http://localhost:3001/getRestaurantOrders?RestaurantID=${RestaurantID}`)
        .then(res=>{
            console.log("data",res.data);
            this.setState({orders:res.data});
        })
        .catch(err=>{
            console.log(err);
        })
    }
    buildCarStructure = () =>{
        let row=[];
        if(this.state.orders!==undefined && this.state.orders.length>0){
            const data=this.state.orders;
            for(let i=0;i<data.length;i=i+3){
                if(i+2<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                            {this.orderCard(data[i])}
                        </div>
                        <div className="col-sm-3">
                        {this.orderCard(data[i+1])}
                        </div>
                        <div className="col-sm-3">
                        {this.orderCard(data[i+2])}
                        </div>
                    </div>)
                }else if(i+1<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                        {this.orderCard(data[i])}
                        </div>
                        <div className="col-sm-3">
                        {this.orderCard(data[i+1])}
                        </div>
                    </div>)
                }else{
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                        {this.orderCard(data[i])}
                        </div>
                    </div>)
                }
            }
        }
        return row;
    }
    orderCard = (data)=>{
        let flag=data.OrderStatus==="Cancelled" || data.OrderPickUpStatus==="Picked up" || data.OrderDeliveryStatus==="Delivered";
        return (
            <React.Fragment>
                <MDBCard style={{ maxWidth: '28rem',borderColor:"coral",borderWidth:"5px",borderRadius:"20px" }}>
                    <MDBCardBody style={{color:"black"}}>
                        
                        <MDBCardText style={{fontSize:"13px"}}>
                            <div><b>OrderID:</b>{data.OrderID}</div>
                            <div><b>Customer Name:</b>{data.Name}</div>
                            <div><b>Order Status:</b>{data.OrderStatus}</div>
                            <div> <b>Order Delivery Mode:</b>{data.OrderPickUp===1?"Pickup":"Delivery"}
                            
                            </div>
                            <div><b>Order Delivery Status:</b>{data.OrderPickUp===1?data.OrderPickUpStatus:data.OrderDeliveryStatus} </div>
                            <div><b>Order Date:</b>{data.OrderTime}</div>
                            <div><b>Total Payment:</b>${data.OrderTotal}</div>
                        </MDBCardText>
                        <button className="btn btn-primary" id={data.OrderID} onClick={(e)=>{this.menuClicked(e)}}>Order Details</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-primary" id={data.OrderID} disabled={flag} onClick={(e)=>{this.updateStatusClicked(e)}}>Update Status</button>
                        
                        <hr/>
                        <div><button className="btn btn-info" id={data.OrderID} onClick={(e)=>{this.profileClicked(e)}}>Customer Profile</button>
                        </div>
                        <div style={{marginTop:"3px",textAlign:"center"}} className="container">
                        </div>
                    </MDBCardBody>
                    </MDBCard>
            </React.Fragment>
        )
    }
    menuClicked = (e)=>{
        this.setState({showMenu:true})
        let orderID=e.target.id;
        let orderDetails=this.state.orders.filter(order=>order.OrderID===orderID)[0];
        Axios.get(`http://localhost:3001/getOrderMenu?OrderID=${orderID}`)
        .then(res=>{
            console.log(res.data);
            this.setState({orderMenu:res.data});
        })
        .catch(err=>{
            console.log(err);
        })
    }
    updateStatusClicked=(e)=>{
        let orderID=e.target.id;
        let orderDetails=this.state.orders.filter(order=>order.OrderID===orderID)[0];
       // console.log(orderDetails);
        if(orderDetails.OrderPickUp===1){
           // console.log("Click",orderDetails.OrderPickUpStatus);
            this.setState({OrderPickUpStatus:orderDetails.OrderPickUpStatus});
        }else{
           // console.log("Click",orderDetails.OrderDeliveryStatus);
            this.setState({OrderDeliveryStatus:orderDetails.OrderDeliveryStatus});
        }
        this.setState({showUpdateStatus:true,OrderID:orderID});
    }
    profileClicked=(e)=>{
        let orderID=e.target.id;
        //console.log(orderID);
        let orderDetails=this.state.orders.filter(order=>order.OrderID===orderID)[0];
        //console.log(orderDetails);
        this.setState({showProfile:true,order:orderDetails})

    }
    handleClose=()=>{
        this.setState({showProfile:false,showMenu:false,showUpdateStatus:false,OrderID:null,OrderPickUpStatus:null,OrderDeliveryStatus:null,edited:false});
    }
    handleChange=(e)=>{
        console.log(e.target,e.target.value);
        this.setState({[e.target.name]:e.target.value,saveEnable:true,edited:true});
    }
    updateStatusBody=()=>{
        if(this.state.OrderID!==null){
            let orderDetails=null;
            for(let order of this.state.orders){
                if(order.OrderID===this.state.OrderID){
                    orderDetails=order;
                    break;
                }
            }
            console.log("PickUP",this.state.OrderPickUpStatus);
            console.log("Delivery",this.state.OrderDeliveryStatus);
            console.log(orderDetails);
            return(
                <React.Fragment>
                    <div className="container">
                        <div className="row">
                        <div className="col-sm-3 offset-sm-1">
                            <b>Select the Status:</b>
                        </div>
                        <div className="col-sm-4">
                        {orderDetails.OrderPickUp===1?<select  name="OrderPickUpStatus" style={{width:"150px"}} value={this.state.OrderPickUpStatus} onChange={this.handleChange}>
                            {pickUpStatus.map((state,index)=>{
                                return <option  key={index}>{state}</option>
                            })}
                         </select>:<select  name="OrderDeliveryStatus" style={{width:"150px"}} value={this.state.OrderDeliveryStatus} onChange={this.handleChange}>
                            {deliveryStatus.map((state,index)=>{
                                return <option  key={index}>{state}</option>
                            })}
                         </select>}
                        </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
    buildTableForMenu= (dish,index) =>{
        let row=[];
        row.push(<td>{index+1}</td>);
        row.push(<td>{dish.DishName}</td>);
        row.push(<td>{dish.MainIngredients}</td>);
        row.push(<td>{dish.Description}</td>);
        row.push(<td>{dish.DishCategory}</td>);
        row.push(<td>{dish.DishType}</td>);
        row.push(<td>{dish.Qty}</td>);
        row.push(<td>${dish.DishPrice}</td>);
        return row;
    }
    orderDetailsBody=()=>{

        return(
            <React.Fragment>
                <Table>
                    <thead>
                        <tr>
                            <td>SNo</td>
                            <td>Dish Name</td>
                            <td>Main Ingredients</td>
                            <td>Description</td>
                            <td>Dish Category</td>
                            <td>Dish Type</td>
                            <td>Qty</td>
                            <td>DishPrice </td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orderMenu.map((dish,index)=>{
                            return(
                                <tr>
                                {this.buildTableForMenu(dish,index)}
                                </tr>
                            )

                        })}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
    customerProfileBody=()=>{
       // console.log(this.state.order);
        const {order}=this.state
        if(this.state.order!=null){
            let image=order.ImageURL;
            if(image==="" || image===null || image===undefined){
                image=noProfileImage;
            }
        return(
            <React.Fragment>
                <div className="row">
                    <div className="col-md-7">
                        <Table>
                            <tbody>
                                <tr>
                                    <td><b>Customer Name</b></td>
                                    <td>:</td>
                                    <td>{order.Name}</td>
                                </tr>
                                <tr>
                                    <td><b>Customer Nickname</b></td>
                                    <td>:</td>
                                    <td>{order.Nickname}</td>
                                </tr>
                                <tr>
                                    <td><b>Customer Contact Number</b></td>
                                    <td>:</td>
                                    <td>{order.PhoneNumber}</td>
                                </tr>
                                <tr>
                                    <td><b>Customer Email</b></td>
                                    <td>:</td>
                                    <td>{order.Email}</td>
                                </tr>
                                <tr>
                                    <td><b>Customer City</b></td>
                                    <td>:</td>
                                    <td>{order.City}</td>
                                </tr>
                                <tr>
                                    <td><b>Customer State</b></td>
                                    <td>:</td>
                                    <td>{order.State}</td>
                                </tr>
                                <tr>
                                    <td><b>Customer Country</b></td>
                                    <td>:</td>
                                    <td>{order.Country}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-md-3 offset-md-1">
                    <img style={{width:"190px",height:"150px"}} src={image} alt="Profile"/>
                    </div>
                </div>
            </React.Fragment>
        );
        }
        return null;
    }
    saveUpdateStatus=()=>{
        console.log(this.state.OrderPickUpStatus,this.state.OrderDeliveryStatus,this.state.OrderID);

        let details={
            OrderID:this.state.OrderID
        }
        if(this.state.OrderPickUpStatus!==null){
            details["OrderPickUpStatus"]=this.state.OrderPickUpStatus;
        }else{
            details["OrderDeliveryStatus"]=this.state.OrderDeliveryStatus;
        }
        Axios.post('http://localhost:3001/updateDeliveryStatus',details)
            .then(res=>{
                console.log(res.data);
                let orders=this.state.orders;
                for(let order of orders){
                    if(order.OrderID===this.state.OrderID){
                        if(details['OrderPickUpStatus']!==undefined){
                            order['OrderPickUpStatus']=details['OrderPickUpStatus'];
                        }else{
                            order['OrderDeliveryStatus']=details['OrderDeliveryStatus'];
                        }
                        break;
                    }
                }
                this.setState({orders:orders});
                this.handleClose();
            })
            .catch(err=>{
                console.log(err);
            })
    }
    render(){
        if(this.props.restaurantDetails===undefined || this.props.restaurantDetails===null){
            return <Redirect to='/'/>
        }
        return(
            <React.Fragment>
                <RestaurantNavbar/>
                <Modal size="lg" show={this.state.showProfile} onHide={this.handleClose}>
                    <ModalHeader>
                    <Modal.Title>Customer Profile</Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                        {this.customerProfileBody()}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Modal size="lg" show={this.state.showMenu} onHide={this.handleClose}>
                    <ModalHeader>
                    <Modal.Title>Order Details</Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                        {this.orderDetailsBody()}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Modal size="lg" show={this.state.showUpdateStatus} onHide={this.handleClose}>
                    <ModalHeader>
                    <Modal.Title>Update Delivery Status</Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                        {this.updateStatusBody()}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="success" disabled={!this.state.edited} onClick={this.saveUpdateStatus}>
                        Update
                    </Button>
                    </Modal.Footer>
                </Modal>
                <div style={{textAlign:'center'}}>
                <h1>Restaurant Orders</h1>
                </div>
                <div>
                    {this.buildCarStructure()}
                </div>
                
            </React.Fragment>
        );
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
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(RestaurantOrders);