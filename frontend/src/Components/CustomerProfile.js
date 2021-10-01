import React from 'react'
import Navbar from "../Components/Navbar.js";
import { connect } from "react-redux";
import noProfileImage from '../images/noProfileImage.png';
import Axios from 'axios'; 
import firebase  from '../firebaseConfig';
import { updateCustomerProfile } from '../actions/customerDashBoard.js';








var states=['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

class CustomerProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            changedAttributes:{},
            Name:"",
            DateOfBirth:null,
            City:null,
            State:null,
            Country:null,
            Nickname:null,
            Email:"",
            PhoneNumber:"",
            edit:false,
            ImageUrl:noProfileImage
            
        }
        this.dateChange=this.dateChange.bind(this);
    }
    componentDidMount(){
        const details=this.props.customerDetails;
        //console.log("Check this",details);

        let date=new Date(details.DateOfBirth);
        let d=date.toISOString();
        d=d.split("T")[0];
        this.setState({DateOfBirth:d,
            City:details.City,
            State:details.State,
            Country:details.Country,
            Name:details.Name,
            Nickname:details.Nickname,
            PhoneNumber:details.PhoneNumber,
            Email:details.Email            
        })
        if(details.ImageURL!==""){
            this.setState({ImageUrl:details.ImageURL})
        }   
     }
    handleChange= (e) =>{
        this.setState({[e.target.name]:e.target.value,changedAttributes:{...this.state.changedAttributes,[e.target.name]:true}});
    }
    handleFileUpload = async(e) =>{
        //console.log("Check pops",this.props.customerDetails);
        let details=this.props.customerDetails;
        const file=e.target.files[0];
        const imagesRef=firebase.storage().ref("customerImages").child(this.props.customerDetails.CustomerID);
        await imagesRef.put(file);
        imagesRef.getDownloadURL()
        .then(url=>{
            this.setState({ImageUrl:url});
            let data={
                customerID:this.props.customerDetails.CustomerID
            };
            data["ImageURL"]=url;
            details["ImageURL"]=url;
            Axios.post('http://localhost:3001/updateCustomerProfile',data)
            .then(async (res)=>{
                //console.log("Update Successful");
                this.props.updateCustomerProfile(details);
            })
            .catch(err=>{
                console.log("Error");
            })
        });
    }
    editClicked=()=>{
        this.setState({edit:true});
    }
    saveClicked=async()=>{
        this.setState({edit:false,changedAttributes:{}});
        let details=this.props.customerDetails;
        let data={
            customerID:this.props.customerDetails.CustomerID
        };
        for(const[key,value] of Object.entries(this.state.changedAttributes)){
            data[key]=this.state[key];
            details[key]=this.state[key];
        }
        //console.log("Changed",data);
        await Axios.post('http://localhost:3001/updateCustomerProfile',data)
            .then(async (res)=>{
                //console.log("Update Successful");
                this.props.updateCustomerProfile(details);
            })
            .catch(err=>{
                console.log("Error");
            })
    }
    dateChange(e){
        this.setState({DateOfBirth:e.target.value,changedAttributes:{...this.state.changedAttributes,DateOfBirth:true}});
    }
    render(){
       // console.log(this.props.customerDetails);
        return (
            <React.Fragment>
                <Navbar/>
                <div className="row" style={{textAlign:'center'}}>
                    <h2>Profile Settings</h2>
                </div>
                <div className="row">
                    <div className="col-md-2 offset-md-1">
                        <div className="row" style={{width:"230px",height:"170px"}}>
                            <img src={this.state.ImageUrl} alt="Profile"/>
                        </div>
                        <div className="row" style={{width:"80%",alignItems:"center",marginTop:"50px",marginLeft:"2.5%"}}>
                            <input
                            ref="fileInput"
                            onChange={this.handleFileUpload}
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            // multiple={false}
                            />
                            <button className="btn btn-primary" onClick={() => this.refs.fileInput.click()}>Upload Image</button>
                        </div>
                    </div>
                    <div className="col-md-7 offset-md-1">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Basic Information</td>
                                </tr>
                                <tr style={{marginTop:"10%"}}>
                                    <td>Name:</td>
                                    <td>:</td>
                                    {!this.state.edit?<td>{this.state.Name}</td>:<td>
                                        <input type="text" name="Name" value={this.state.Name} onChange={this.handleChange}/>
                                        </td>}
                                </tr>
                                <tr>
                                    <td>Nickname</td>
                                    <td>:</td>
                                    {!this.state.edit?<td>{this.state.Nickname}</td>:<td>
                                        <input type="text" name="Nickname" value={this.state.Nickname} onChange={this.handleChange}/>
                                        </td>}
                                </tr>
                                <tr>
                                    <td>Date Of Birth</td>
                                    <td>:</td>
                                    <td>
                                        <input type="date" value={this.state.DateOfBirth} onChange={this.dateChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>:</td>
                                    {!this.state.edit?<td>{this.state.City}</td>:<td>
                                        <input type="text" name="City" value={this.state.City} onChange={this.handleChange}/>
                                        </td>}
                                </tr>
                                <tr>
                                    <td>State</td>
                                    <td>:</td>
                                    <td>
                                        <select name="State" style={{width:"100px"}} value={this.state.State} onChange={this.handleChange}>
                                            {states.map((state,index)=>{
                                                return <option  key={index}>{state}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Country</td>
                                    <td>:</td>
                                    <td>
                                    <select name="Country" style={{width:"250px"}} value={this.state.Country} onChange={this.handleChange}>
                                            {country_list.map((country,index)=>{
                                                return <option  key={index}>{country}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Contact Information</td>
                                </tr>
                                <tr>
                                    <td>Email ID</td>
                                    <td>:</td>
                                    {!this.state.edit?<td>{this.state.Email}</td>:<td>
                                        <input type="email" name="Email" value={this.state.Email} onChange={this.handleChange}/>
                                        </td>}
                                </tr>
                                <tr>
                                    <td>Contact Number</td>
                                    <td>:</td>
                                    {!this.state.edit?<td>{this.state.PhoneNumber}</td>:<td>
                                        <input type="text" pattern="\d*" maxlength="10" name="PhoneNumber" value={this.state.PhoneNumber} onChange={this.handleChange}/>
                                        </td>}
                                </tr>
                                <tr style={{marginTop:"10px"}}>
                                    <td><button type="button" className="btn btn-primary" onClick={this.editClicked}>Edit</button></td>
                                    <td><button type="button" disabled={!Object.keys(this.state.changedAttributes).length>0} className="btn btn-primary" onClick={this.saveClicked}>Save</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    //console.log(state);
    return {
        customerDetails:state.customerLoginReducer.customerLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateCustomerProfile:data=>dispatch(updateCustomerProfile(data))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(CustomerProfile);
