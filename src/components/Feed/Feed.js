import React, { Component } from "react";
import Web3 from "web3";
import Carnival from "../../abis/Carnival.json";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
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
            <div>Feed Page      
                <div
                    class={`nav-item  ${location.pathname === "/screen/:id" ? "active" : ""
                    }`}
                >
                    <Button
                    color="white"
                    size="small"
                    >
                    
                    <Link class="nav-link" to="/screen/5" style={{ color: "#fd535b" }} >
                        View NFT
                    </Link>
                    </Button>

                    <Button
                    color="white"
                    size="small"
                    >
                    
                    <Link class="nav-link" to="/screen/4" style={{ color: "#fd535b" }} >
                        View NFT
                    </Link>
                    </Button>

                    <Button
                    color="white"
                    size="small"
                    >
                    
                    <Link class="nav-link" to="/screen/3" style={{ color: "#fd535b" }} >
                        View NFT
                    </Link>
                    </Button>

                    
                    
                    <Link class="nav-link" to="/screen/2" style={{ color: "#fd535b" }} >
                    <img src = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1453728013993-6d66e9c9123a%3Fixid%3DMnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%253D%26ixlib%3Drb-1.2.1%26w%3D1000%26q%3D80&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fview&tbnid=tTplitM2kjOQtM&vet=12ahUKEwjUmqS3lZXzAhXAs0sFHcRIC0wQMygCegUIARDOAQ..i&docid=-UStXW0dQEx4SM&w=1000&h=667&q=image&ved=2ahUKEwjUmqS3lZXzAhXAs0sFHcRIC0wQMygCegUIARDOAQ" />
                    </Link>
                   
                </div>
            </div>
        );
    }
}

export default Feed;