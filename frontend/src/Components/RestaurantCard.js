import React from 'react'
import Card from 'react-bootstrap/Card';
import UberEatsLogo from '../images/UberEatsLogo.png';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
class RestaurantCard extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return (
            <React.Fragment>
                <a href='#'><MDBCard style={{ maxWidth: '22rem' }}>
                    <MDBCardImage src={UberEatsLogo} position='top' alt='...' />
                    <MDBCardBody>
                        <MDBCardTitle>Card title</MDBCardTitle>
                        <MDBCardText>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard></a>
            </React.Fragment>
        )
    }
}

export default RestaurantCard
