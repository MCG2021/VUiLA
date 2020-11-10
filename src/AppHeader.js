import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class AppHeader extends Component {



    render() {
        const account = this.props.userAccount;
        const adminAccount = this.props.adminAccount;
        let head;

        if( adminAccount !== account){
            console.log(adminAccount)
            head =
             <p> 
                 User Account: {this.props.userAccount}
               <br />
                Admin Account : {this.props.adminAddress}
            </p>
        }
        else {
            head = <p> 
                     You are logged in as Admin Account : {this.props.adminAccount}
                  </p>
        }

        return <div style={{'fontSize' : '20px'}}>
            {head}
            <h2 style={{ padding: "10px 20px", textAlign: "center", color: "white"}}>
            <Button color='red'   onClick={() => this.props.logOut()}>
             LOG OUT
            </Button></h2>
        </div>
    }
}

export default AppHeader;