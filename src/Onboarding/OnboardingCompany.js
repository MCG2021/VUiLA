import React, { Component } from 'react';

import { Form, Input, Select, Segment, Header, Divider,Image} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


const options = [
    {key: 'm', text: "Manufacturer", value: "Manufacturer"},
    {key: 'd', text: "Distributor", value: "Distributor"},
    {key: 't', text: "3PL Trucking", value: "3PL trucking"}
]

class OnboardingCompany extends Component{

    constructor(props){
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = { companyName: null, identificationNumber: null, location: null,scRole: null,error: '', companyId: null, owner:null, isApprovedByAdmin: null, isPopUpOpen: true};
        this.changeHandler = this.changeHandler.bind(this);
        this.changeSelect = this.changeSelect.bind(this);

    }

    componentWillMount(){
        this.checkOwnedCompany()
    }

    companyDidMount(){
        this.watchEvents()
    }

    watchEvents(){
        this.props.mcg.events.companyRegistered({
            filter:{_user: this.props.userAccount}
        },{fromBlock:0, toBlock: "latest"
        },function(error, event){console.log(event)}).on('data',function(event){
            this.setState({companyId: event.companyId})
            console.log(event.companyId);
        })
    }

    async registerMyCompany(companyName, identificationNumber,location, scRole){
        
        const gasAmount = await this.props.mcg.methods.registerCompany(companyName,identificationNumber,location,scRole).estimateGas({from: this.props.userAccount});
        await this.props.mcg.methods.registerCompany(companyName,identificationNumber,location,scRole).send({from: this.props.userAccount, gas: gasAmount})
    }

    async checkOwnedCompany(){
        var company = await this.props.mcg.methods.getYourCompany().call({from: this.props.userAccount});
        console.log(company.companyId.toNumber())
        if(company.owner.length > 2){


           this.setState({companyName: company.companyName,
                        companyId :company.companyId.toNumber(), 
                        identificationNumber: company.identificationNumber.toNumber(), 
                        isApprovedByAdmin: company.isApprovedByAdmin, 
                        location: company.location, 
                        scRole: company.scRole});
        }
        // console.log(company.companyId.toNumber());
        return (company.owner.length > 2)
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = "";
        if (nam === "company"||"location"||"scRole"){
            if(val!=="" && Number(val)){
                err = <strong color = "red">Fields cannot be empty and must be string except Identification Number</strong>
            }
    }
        this.setState({error:err});
        this.setState({[nam]:val})
    }

    changeSelect = (e,{value}) => this.setState({scRole:value});

    submitHandler = (event) => {
        event.preventDefault();
        this.registerMyCompany(this.state.companyName, this.state.identificationNumber, this.state.location, this.state.scRole);
    }

    render(){
        return(!this.state.companyId
              ? <Form onSubmit = {this.submitHandler}>
                    <Form.Group widths = "equal">
                        <Form.Field control = {Input}  fluid label='Company Name' placeholder=' XYZ Ltd.' name = "companyName" onChange = {this.changeHandler}/>
                        <Form.Field control = {Input} fluid label='Identification Number' placeholder="123456789" name = "identificationNumber" onChange  = {this.changeHandler} />
                        <Form.Field control = {Input} fluid label='Location' placeholder="1000 10 W Ave Vancouver" name = "location" onChange  = {this.changeHandler} />
                        <Form.Field control = {Select}
                            name = "scRole"
                            onChange = {this.changeSelect}   
                            fluid
                            label='Select Supply Chain Role'
                            options = {options} 
                            placeholder='Manufacturer'
                        />
                    </Form.Group>s
                    <Form.Button name = "submitButton" type = "submit" >Register Company</Form.Button>
                    {this.state.error}
                    <p>Company Name is {this.state.companyName} and ID is {this.state.identificationNumber} with location {this.state.location} and role{this.state.scRole} </p>                
                </Form>
              :<div>
                     <Segment>
                        <Header as='h2' floated='center'>
                         COMPANY DETAILS:
                        </Header>
                        <Divider clearing />
                        <p>
                        companyId :{this.state.companyId} 
                        <br />Ddentification Number: {this.state.companyName}
                        <br />Admin Approved: {this.state.isApprovedByAdmin} Pending
                        <br />Location: {this.state.location} 
                        <br />SC Role: {this.state.scRole}
                        </p>
                    </Segment>
              </div>
        )
    }
}

export default OnboardingCompany;