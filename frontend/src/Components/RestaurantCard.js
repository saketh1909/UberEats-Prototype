import React from 'react'
import subway from '../images/subway.jpg'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
class RestaurantCard extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        const data=this.props.data;
        return (
            <React.Fragment>
                {data!==undefined?<a href='#' style={{textDecoration:"none"}}><MDBCard style={{ maxWidth: '22rem' }}>
                    <MDBCardImage src={subway} position='top' alt='Image' style={{height:"150px"}} />
                    <MDBCardBody style={{color:"black"}}>
                        <MDBCardTitle style={{textAlign:"center"}}>{data.Name}</MDBCardTitle>
                        <MDBCardText style={{fontSize:"15px"}}>
                            Timings:{data.Timings}&nbsp;
                            <span >Location:{data.Location}</span>
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard></a>:null}
            </React.Fragment>
        )
    }
}

export default RestaurantCard
