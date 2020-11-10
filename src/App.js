import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import Web3 from 'web3';
import  {GATEWAY, CONTRACT_ADDRESS, CONTRACT_ABI}  from './config'
import LoggedOutHome from './LoggedOutHome'
import LoggedInHome from './LoggedInHome'

class App extends Component {

  // componentWillMount(){
  //   this.loadBlockchainData()
  // }

  constructor(props) {
      super(props)
      this.state = {
          gateway: GATEWAY,
          contractAddress: CONTRACT_ADDRESS,
          contractAbi: CONTRACT_ABI,
          loggedIn: false,
          userAccount: '',
          appModalOpen: false,
          mcg: null,
          adminAddress:''
      };
  }

  // async loadBlockchainData(){
    
  //   const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
  //   console.log(web3)
  //   const accounts = await web3.eth.getAccounts()
  //   console.log(accounts)
  //   this.setState({userAccount: accounts[0]})
  // }

  render() {
      return (!this.state.loggedIn)
      ? <LoggedOutHome
          gateway={this.state.gateway}
          contractAddress={this.state.contractAddress}
          contractAbi={this.state.contractAbi}
          logIn={(smartContract, account, adminAddress) => this.setState({
              loggedIn: true,
              userAccount: account,
              mcg: smartContract,
              appModalOpen: true,
              adminAccount: adminAddress
          })}
        />
    
        : <div >
          <LoggedInHome
              {...this.state}
              logOut={() => this.setState({
                  loggedIn: false,
                  userAccount: '',
                  mcg: null
              })}
          />
          <Modal   size='tiny'
              open={this.state.appModalOpen}
              onClose={() => this.setState({appModalOpen: false})}
              onOpen={() => this.setState({appModalOpen: true})}
              style={{ backgroundColor: "rgb(192,192,192,0.8)",'position': 'relative'}}
          >
              <Modal.Header style={{ backgroundColor: "rgb(192,192,192,0.8)"}}>Logged In Successfully!</Modal.Header>
              <Modal.Content style={{ backgroundColor: "rgb(192,192,192,0.8)"}} >
                  <Modal.Description>
                      Account: {this.state.userAccount}
                  </Modal.Description>
              </Modal.Content>
              <Modal.Actions style={{ backgroundColor: "rgb(192,192,192,0.8)"}}>
                  <Button color='green'
                      onClick={() => {
                      this.setState({appModalOpen: false})
                      }}>
                      Ok!
                  </Button>
              </Modal.Actions>
          </Modal>
      </div>

      // <div className = "container">

      //  <p>
      //    User Account : {this.state.userAccount}
      //  </p> 


      // </div>
  }
}

export default App;
