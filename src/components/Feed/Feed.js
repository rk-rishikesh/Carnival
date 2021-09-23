import React, { Component } from "react";
import Web3 from "web3";
import carnival from "../../abis/Carnival.json";
import IconButton from '@material-ui/core/IconButton';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './Feed.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Container} from 'react-bootstrap';


class Feed extends Component {
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    }


    async loadBlockchainData() {

        const web3 = window.web3;
        // Initialize your dapp here like getting user accounts etc
        // Load account
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        // Network ID
        const networkId = await web3.eth.net.getId();
        const networkData = Carnival.networks[networkId];

        if (networkData) {
            const carnival = new web3.eth.Contract(Carnival.abi, networkData.address);
            this.setState({ carnival });
            this.setState({ loading: false });
        } else {
            window.alert("NFT contract not deployed to detected network.");
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            account: "",
            carnival: null,
            loading: true
        };

    }

    render() {
        return (
            <div>Feed Here</div>
        );
    }
}

export default Feed;