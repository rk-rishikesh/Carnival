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

import Favorite from "@material-ui/icons/Favorite";
import s from "./spidy.png";
import h from "./hal.png";
import j from "./halloween.png";
import k from "./halll.png";

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


    addViewer(feedId) {
        this.setState({ loading: true });
        this.state.carnival.methods
          .addViewer(feedId)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false });
          });
      }

    constructor(props) {
        super(props);
        this.state = {
            account: "",
            carnival: null,
            loading: true
        };
        this.addViewer = this.addViewer.bind(this);
    }

    render() {
        return (
            <div>    
                <div
                    class={`nav-item  ${location.pathname === "/screen/:id" ? "active" : ""
                    }`}
                >
                    <Button
                    color="white"
                    size="small"
                    >
                    
                    <Link class="nav-link" to="/screen/1" style={{ color: "#fd535b" }} >
                    <div className="card mb-3" >
                        <div className="card-header">
                          <small className="text-muted"></small>
                        </div>
                        <ul
                          id="imageList"
                          className="list-group list-group-flush"
                        >
                          <li className="list-group-item">
                            <p class="text-center">
                              <img
                                src={s}
                                style={{ width: "420px", height: "200px" }}
                              />
                            </p>
                            <p style={{ color: "black" }}>SpiderMan</p>
                          </li>
                          <li className="list-group-item py-2">
                            <p
                              className="float-left"
                              style={{ color: "black" }}
                            >
                              0x63853F89ba59dC2610D8Fb375185e8bec3CB3f51
                            </p>
                            
                            <div
                              className="btn btn-link btn-sm float-right pt-0"
                              style={{
                                margin: "auto",
                                display: "block",
                                width: "fit-content",
                              }}
                            >
                              
                              <button
                                className="btn btn-link btn-sm float-left pt-0"
                                
                              >
                             <Favorite />
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Link>
                    </Button>
                    <Button
                    color="white"
                    size="small"
                    onClick={() => {
                      this.addViewer(this.state.tokenId);
                    }}
                    >
                    
                    <Link class="nav-link" to="/screen/3" style={{ color: "#fd535b" }} >
                    <div className="card mb-4" >
                        <div className="card-header">
                          <small className="text-muted"></small>
                        </div>
                        <ul
                          id="imageList"
                          className="list-group list-group-flush"
                        >
                          <li className="list-group-item">
                            <p class="text-center">
                              <img
                                src={j}
                                style={{ width: "420px", height: "200px" }}
                              />
                            </p>
                            <p style={{ color: "black" }}>Halloween</p>
                          </li>
                          <li className="list-group-item py-2">
                            <p
                              className="float-left"
                              style={{ color: "black" }}
                            >
                              0x63853F89ba59dC2610D8Fb375185e8bec3CB3f51
                            </p>
                            <div
                              className="btn btn-link btn-sm float-right pt-0"
                              style={{
                                margin: "auto",
                                display: "block",
                                width: "fit-content",
                              }}
                            >
                              <button
                                className="btn btn-link btn-sm float-left pt-0"
                                
                              >
                             <Favorite />
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Link>
                    </Button>
                    <Button
                    color="white"
                    size="small"
                    >
                    
                    <Link class="nav-link" to="/screen/2" style={{ color: "#fd535b" }} >
                    <div className="card mb-4" >
                        <div className="card-header">
                          <small className="text-muted"></small>
                        </div>
                        <ul
                          id="imageList"
                          className="list-group list-group-flush"
                        >
                          <li className="list-group-item">
                            <p class="text-center">
                              <img
                                src={h}
                                style={{ maxWidth: "420px", height: "200px" }}
                              />
                            </p>
                            <p style={{ color: "black" }}>The long ride</p>
                          </li>
                          <li className="list-group-item py-2">
                            <p
                              className="float-left"
                              style={{ color: "black" }}
                            >
                              0xf645C4f87c8b525747A1a428E107F0eB0b3Bdb1D
                            </p>
                            <div
                              className="btn btn-link btn-sm float-right pt-0"
                              style={{
                                margin: "auto",
                                display: "block",
                                width: "fit-content",
                              }}
                            >
                              <button
                                className="btn btn-link btn-sm float-left pt-0"
                                
                              >
                             <Favorite />
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Link>
                    </Button>

                    <Button
                    color="white"
                    size="small"
                    >
                    
                    <Link class="nav-link" to="/screen/4" style={{ color: "#fd535b" }} >
                    <div className="card mb-4" >
                        <div className="card-header">
                          <small className="text-muted"></small>
                        </div>
                        <ul
                          id="imageList"
                          className="list-group list-group-flush"
                        >
                          <li className="list-group-item">
                            <p class="text-center">
                              <img
                                src={k}
                                style={{width: "420px", height: "200px" }}
                              />
                            </p>
                            <p style={{ color: "black" }}>The Dark Moon</p>
                          </li>
                          <li className="list-group-item py-2">
                            <p
                              className="float-left"
                              style={{ color: "black" }}
                            >
                              0xf645C4f87c8b525747A1a428E107F0eB0b3Bdb1D
                            </p>
                            <div
                              className="btn btn-link btn-sm float-right pt-0"
                              style={{
                                margin: "auto",
                                display: "block",
                                width: "fit-content",
                              }}
                            >
                              <button
                                className="btn btn-link btn-sm float-left pt-0"
                                
                              >
                             <Favorite />
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Link>
                    </Button>
                </div>
            </div>
        );
    }
}

export default Feed;