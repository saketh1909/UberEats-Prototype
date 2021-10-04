import React from 'react'
import { connect } from "react-redux";
import Navbar from "../Components/Navbar.js";
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import noProfileImage from '../images/noProfileImage.png';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage} from 'mdb-react-ui-kit';
import {updateCartItems} from '../actions/customerDashBoard';
import {Modal,Button, Table} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
class RestaurantViewPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Menu:[],
            Qty:{},
            cartCount:0,
            place:false
        }
    }
    componentDidMount(){
        console.log("check",this.props.restaurant);
        var url=`http://localhost:3001/getRestaurantMenu?RestaurantID=${this.props.restaurant.RestaurantID}`;
        Axios.get(url)
        .then(res=>{
            console.log(res.data);
            this.setState({menu:res.data})
        })
        if(this.props.cartItems!==undefined){
            this.setState({cartCount:this.props.cartItems.length});
        }
        
    }
    buildCarStructure = (data) =>{
        let row=[];
        if(data!==undefined && data.length>0){
            for(let i=0;i<data.length;i=i+3){
                if(i+2<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                            {this.menuCard(data[i])}
                        </div>
                        <div className="col-sm-3">
                        {this.menuCard(data[i+1])}
                        </div>
                        <div className="col-sm-3">
                        {this.menuCard(data[i+2])}
                        </div>
                    </div>)
                }else if(i+1<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                        {this.menuCard(data[i])}
                        </div>
                        <div className="col-sm-3">
                        {this.menuCard(data[i+1])}
                        </div>
                    </div>)
                }else{
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                        {this.menuCard(data[i])}
                        </div>
                    </div>)
                }
            }
        }
        return row;
    }
    handleChange=(e)=>{
        this.setState({Qty:{...this.state.Qty,[e.target.id]:e.target.value}});
    }
    menuCard=(data)=>{
        if(data.DishImageURL===""){
            data.DishImageURL=noProfileImage;
        }
        return (
            <React.Fragment>
                {data!==undefined?<MDBCard style={{ maxWidth: '24rem' }}>
                    <MDBCardImage src={data.DishImageURL} position='top' alt='Image' style={{height:"150px"}} />
                    <MDBCardBody style={{color:"black"}}>
                        <MDBCardTitle style={{textAlign:"center"}}>{data.DishName}</MDBCardTitle>
                        <MDBCardText style={{fontSize:"13px"}}>
                            <div><b>Description:</b>{data.Description}</div>
                            <div><b>Category:</b>{data.DishCategory}&nbsp;&nbsp;
                            <span ><b>Price:</b>${data.DishPrice}</span></div>
                            <div><b>Main Ingredients:</b>{data.MainIngredients}</div>
                        </MDBCardText>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Qty :</td>
                                    <td style={{width:"50px"}}><select id={data.DishID}name="Qty" style={{width:"40px"}} value={this.state.Qty[data.DishID]} onChange={this.handleChange}>
                                        <option value={1} selected>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select></td>
                                    <td>
                                        <button className="btn btn-primary" id={data.DishID} onClick={(e)=>{this.addMenuToCart(e)}}>Add to cart</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </MDBCardBody>
                    </MDBCard>:null}
            </React.Fragment>
        )
    }
    addMenuToCart=(e)=>{
        console.log(e.target.id);
        let cart=[];
        let {id}=e.target;
        if(this.props.cartItems!==undefined){
            cart=this.props.cartItems;
        }
        let dish=this.state.menu.filter(item=>item.DishID===id)[0];
        dish["Qty"]=this.state.Qty[id]===undefined?1:this.state.Qty[id];
        cart.push(dish);
        this.setState({cartCount:cart.length})
        this.props.updateCartItems(cart);
    }
    handleClose=()=>{
        this.setState({showCart:false});
    }
    openCart=()=>{
        if(this.props.cartItems===undefined || this.props.cartItems.length==0) return;
        this.setState({showCart:true});
    }
    removeClicked=(e)=>{
        let items=this.props.cartItems.filter(item=>item.DishID!==e.target.id);
        this.props.updateCartItems(items);

        this.setState({showCart:true});
    }
    cartBody=()=>{
        const {cartItems}=this.props;
        if(cartItems===undefined) return;
        let totalCost=0;
        return(
            <>
                <Table>
                    <thead>
                        <tr>
                            <td>SNo</td>
                            <td>Dish Name</td>
                            <td>Dish Price</td>
                            <td>Qty</td>
                            <td>Price</td>
                            <td>Remove Item from Cart</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartItems.map((item,index)=>{
                                totalCost+=item.DishPrice*item.Qty;
                                totalCost=Math.round(totalCost * 100) / 100
                                return(
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>{item.DishName}</td>
                                    <td>${item.DishPrice}</td>
                                    <td>{item.Qty}</td>
                                    <td>${item.Qty * item.DishPrice}</td>
                                    <td>
                                        <button type="button" className="btn btn-dark" id={item.DishID} onClick={(e)=>{this.removeClicked(e)}}>Remove</button>
                                    </td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><b>Total Price:</b></td>
                            <td style={{marginLeft:"100px"}}><b>${totalCost}</b></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }
    placeOrder=()=>{
        this.setState({place:true});
    }
    render(){
        if(this.state.place){
            return <Redirect to='/customerOrderConfirmation'/>
        }
        if(this.props.customerLogin!==undefined){
            return <Redirect to='/'/>
        }
        return (
            <React.Fragment>
                <Navbar/>
                <Modal size="lg" show={this.state.showCart} onHide={this.handleClose}>
                    <ModalHeader>
                    <Modal.Title><h2>Restaurant Name: {this.props.restaurant.Name}</h2></Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                        {this.cartBody()}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                        Close
                    </Button>
                    <button className="btn btn-dark" style={{width:"200px"}} type="submit" onClick={this.placeOrder}>
                        Go To Checkout
                    </button>
                    </Modal.Footer>
                </Modal>
                <div className="container" style={{textAlign:'right',marginTop:"3px"}}>
                <button type="button" class="btn btn-dark" onClick={this.openCart}>
                    Cart <span class="badge badge-light">{this.state.cartCount}</span>
                    </button>
                </div>
                <div>   
                    {this.buildCarStructure(this.state.menu)}

                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    console.log(state);
    return {
        restaurant:state.customerDashBoardReducer.restaurantViewData,
        cartItems:state.customerDashBoardReducer.cartItems
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateCartItems:(data)=>dispatch(updateCartItems(data))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(RestaurantViewPage);
