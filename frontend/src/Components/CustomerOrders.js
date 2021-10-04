import React from 'react'
import { connect } from "react-redux";
import Navbar from "../Components/Navbar.js";
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import {Modal,Button} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
const months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
class CustomerOrders extends React.Component{
    constructor(props){
        super(props);
        this.state={
            orders:[],
            originalOrders:[],
            ordersMenu:[],
            show:false,
            currentMenu:[]
        }
    }
    componentDidMount(){
        const {CustomerID}=this.props.customerDetails;
        Axios.get(`http://localhost:3001/getCustomerOrders?CustomerID=${CustomerID}`)
            .then(res=>{
                console.log(res.data);
                const {data}=res;
                this.setState({orders:data.Orders,ordersMenu:data.OrdersMenu,originalOrders:data.Orders});
            })
            .catch(err=>{
                console.log(err);
            })
    }
  
    buildOrdersBody=()=>{
        if(this.state.orders.length===0) return;
        const {orders}= this.state;
        let row=[];
        orders.map(order=>{
            let date=new Date(order.OrderTime);
            row.push(
                <tr>
                    <td>
                    <div>
                        <b><p style={{fontSize:"30px",display:"inline"}}>{order.Name}<span style={{fontSize:"25px"}}>- ({order.Location})</span></p></b>
                    </div>
                    <div>
                        <p><b>Order Status:</b> {order.OrderStatus} &nbsp;&nbsp;&nbsp;&nbsp;  <b>Order Delivery Status:  </b>{order.OrderPickUp===1?order.OrderPickUpStatus:order.OrderDeliveryStatus}</p>
                    </div>
                    <div>
                        <p>
                            {order.NoOfItems} items for ${order.OrderTotal}. {months[date.getMonth()]} {date.getDate()} at {date.getHours()>12?date.getHours()-12:date.getHours()}:{date.getMinutes()} {date.getHours()>12?'PM':'AM'}. <a id={order.OrderID} onClick={(e)=>{this.showReceipt(e)}} href='#'>View receipt</a>
                        </p>
                    </div>
                    </td>
                </tr>
            )
        })

        return row;
    }
    showReceipt=(e)=>{
        this.setState({show:true});
        let menu=this.state.ordersMenu.filter(menu=>menu.OrderID===e.target.id);
        this.setState({currentMenu:menu});
    }
    receiptBody=()=>{
        if(this.state.currentMenu.length>0){
            const {currentMenu}=this.state;
            let row=[];
            row.push(<tr>
                <td><b>Total</b></td>
                <td></td>
                <td></td>
                <td><b>${currentMenu[0].OrderTotal}</b></td>
            </tr>)
            currentMenu.map(menu=>{
                row.push(<tr>
                    <td>{menu.DishName}</td>
                    <td></td>
                    <td></td>
                    <td>${menu.DishPrice}</td>
                </tr>)
            })  
            
            return row;
        }
    }
    handleClose=()=>{
        this.setState({show:false,currentMenu:[]});
    }
    handleChange=(e)=>{
        let filter=e.target.value;
        if(filter==="Select a Status") return;
        const {orders}=this.state;
        let filterData=[];
        let nonFilterData=[];
        for(let order of orders){
            if(order.OrderPickUpStatus===filter|| order.OrderDeliveryStatus===filter){
                filterData.push(order);
            }else{
                nonFilterData.push(order);
            }
        }
        filterData=[...filterData,...nonFilterData];
        this.setState({orders:filterData});
        console.log(filterData);
    }
    render(){
        if(this.props.customerDetails===undefined){
            return <Redirect to='/'/>
        }
        return(
            <React.Fragment>
                <Navbar/>

                <Modal size="md" show={this.state.show} onHide={this.handleClose}>
                    <ModalHeader>
                    <Modal.Title>Receipt</Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                        <Table>
                            <tbody>
                                {this.receiptBody()}
                            </tbody>
                        </Table>
                        
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <div className="container">
                <div>
                    <h1>Past Orders</h1>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <h4>Filter the orders:</h4>
                    </div>
                    <div className="col-md-3">
                        <select onChange={this.handleChange}>
                            <option>Select a Status</option>
                            <option>Order Received</option>
                            <option>Preparing</option>
                            <option>On the way</option>
                            <option>Delivered</option>
                            <option>Pick up Ready</option>
                            <option>Picked up</option>
                        </select>
                    </div>
                </div>
                <div>
                    <Table>
                        <tbody>
                            {this.buildOrdersBody()}
                        </tbody>
                    </Table>
                </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    console.log("state",state);
    return {
        customerDetails:state.customerLoginReducer.customerLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(CustomerOrders);