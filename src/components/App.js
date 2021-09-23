import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './NavBar/Navbar';
import Carnival from '../abis/Carnival.json'
import Web3 from 'web3';
import Upload from './Upload/Upload';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import Login from './Login/Login';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Carnival.networks[networkId]
    if (networkData) {
      const carnival = new web3.eth.Contract(Carnival.abi, networkData.address)
      this.setState({ carnival })

      this.setState({ loading: false })

    } else {
      window.alert('NFT contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      carnival: null
    }
  }

  render() {
    return (
      <Router>
        <Navbar account={this.state.account} />
        <Switch>
          <Route path="/" exact component={() => <Login />} />
          <Route path="/upload" exact component={() => <Upload />} />
          <Route path="/feed" exact component={() => <Feed />} />
          <Route path="/profile" exact component={() => <Profile />} />
        </Switch>
      </Router>
    );
  }

}

export default App;