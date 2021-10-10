import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./Screen.css";
import { TextField, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Web3 from "web3";
import Carnival from "../../abis/Carnival.json";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { NFTStorage, File } from "nft.storage";
import a from "./h.jpg";
import b from "./ha.jpg";
import c from "./halll.jpg"
import d from "./cc.jpg";

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEwNzc3ODdhNjU3OTJmRGIzN0YyYzQzMzcwM2MxNDJCNjg3QjIxMWEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzMjU1MTg0OTk0NiwibmFtZSI6IkNhcm5pdmFsIn0.uJtvLmAVBHVOwiRUleEoXEQJWoJyaMdA9fipLch9sq8";
const client = new NFTStorage({ token: apiKey });

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  paper: {
    margin: "30px 130px",
    width: "60%",
    height: "75%",
    padding: theme.spacing(2),
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "5px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
});

//Declare IPFS
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

class Screen extends Component {
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
      this.setState({ contractAddress: networkData.address });
      console.log(this.state.contractAddress);
      this.setState({ loading: false });
      this.setState({ tokenId: this.props.id });

      const swaglen = await carnival.methods
        .relatedNFTCount(this.state.tokenId)
        .call();
      console.log(swaglen);
      for (var i = 0; i < swaglen; i++) {
        const swagId = await carnival.methods
          .relatedNFTs(this.state.tokenId, i)
          .call();
        const swagURI = await carnival.methods.tokenURI(swagId).call();
        console.log(swagURI);
        const slicedUrl = `https://ipfs.io/ipfs/${swagURI.slice(
          7,
          swagURI.length
        )}`;
        const response = await fetch(slicedUrl);
        const json = await response.json();
        console.log(json);
        const imageUrl = json.image.slice(7, json.image.length - 10);
        const finalUrl = `https://${imageUrl}.ipfs.dweb.link/trial.jpg`;
        console.log(finalUrl);

        const Post = [i, json.name, json.description, finalUrl];
        // console.log(Post,this.state.feedPosts)

        this.setState({
          swags: [...this.state.swags, [Post]],
        });
        console.log(Post, this.state.swags);
      }

      const owner = await carnival.methods.creators(this.state.tokenId).call();
      this.setState({ owner: owner });
      const uri = await carnival.methods.tokenURI(this.state.tokenId).call();
      console.log(uri);
      this.setState({ uri: uri });
      const slicedUrl = `https://ipfs.io/ipfs/${uri.slice(7, uri.length)}`;
      const response = await fetch(slicedUrl);
      const json = await response.json();
      console.log(json);
      //const latitude = json.properties.latitude
      //const longitude = json.properties.longitude
      this.setState({ name: json.name });
      this.setState({ description: json.description });

      const videoUrl = json.image.slice(7, json.image.length - 10);
      console.log(videoUrl);
      const url = `https://${videoUrl}.ipfs.dweb.link/trial.mp4`;
      console.log(url);
      this.setState({ url: url });
    } else {
      window.alert("NFT contract not deployed to detected network.");
    }
  }

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  uploadSpecialSwag = (name, description) => {
    this.setState({ loading: true });

    const data = this.state.buffer;

    async function getMetadata() {
      console.log("metadata");
      const metadata = await client.store({
        name: name,
        description: description,
        image: new File([data], "trial.jpg", { type: "image/jpg" }),
      });
      console.log("metadata", metadata);
      return metadata.url;
    }

    const metadata = getMetadata();

    console.log(metadata);

    metadata.then(async (value) => {
      this.state.carnival.methods
        .createSpecialSwag(this.state.tokenId, value)
        .send({ from: this.state.account })
        .on("transactionHash", (hash) => {
          this.setState({ loading: false });
        });

      console.log(value);
    });

    this.setState({ loading: false });
  };

  uploadSwag = (quantity, cost) => {
    this.setState({ loading: true });

    const data = this.state.buffer;

    async function getMetadata() {
      console.log("metadata");
      const metadata = await client.store({
        name: quantity,
        description: cost,
        image: new File([data], "trial.jpg", { type: "image/jpg" }),
      });
      console.log("metadata", metadata);
      return metadata.url;
    }

    const metadata = getMetadata();

    console.log(metadata);

    metadata.then(async (value) => {
      this.state.carnival.methods
        .createSwagNFT(this.state.tokenId, quantity, cost, value)
        .send({ from: this.state.account })
        .on("transactionHash", (hash) => {
          this.setState({ loading: false });
        });

      console.log(value);
    });

    this.setState({ loading: false });
  };

  setQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  };

  setCost = (event) => {
    this.setState({ cost: event.target.value });
  };

  watchVideo = (id) => {
    this.setState({ loading: true });
    //make payment
    this.state.carnival.methods
      .watchVideo(id)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
        this.setState({ watch: this.state.url })
      });
  };

  x = (id, addresses, share) => {
    this.setState({ loading: true });
    console.log("Pinky");
    this.state.carnival.methods
      .addFractionalOwners(id, addresses, share)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  addItem(e) {
    if (this._inputElement.value !== "") {
      var newItem = this._inputElement.value;

      var newItemm = this.b.value;

      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem),
        };
      });

      this.setState((prevState) => {
        return {
          itemms: prevState.itemms.concat(newItemm),
        };
      });

      this._inputElement.value = "";
      this.b.value = "";
    }

    console.log(this.state.items);
    console.log(this.state.itemms);

    e.preventDefault();
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      carnival: null,
      contractAddress: null,
      loading: true,
      quantity: "",
      cost: "",
      tokenId: 0,
      currentHash: null,
      currentTitle: null,
      currentOwner: null,
      uri: "",
      url: "",
      name: "",
      description: "",
      owner: null,
      swags: [],
      swagLen: 0,
      items: [],
      itemms: [],
      watch: "",
    };
    this.uploadSwag = this.uploadSwag.bind(this);
    this.uploadSpecialSwag = this.uploadSpecialSwag.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.addItem = this.addItem.bind(this);
    this.x = this.x.bind(this);
    this.watchVideo = this.watchVideo.bind(this);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="not-found">
        <div style={{ marginLeft: "2%", maxwidth: "30%" }}></div>
        <div className="card mb-4">
          <div>
            <video
              src={this.state.watch}
              controls
              style={{ width: "700px" }}
              onClick={() => {
                this.watchVideo(this.state.tokenId);
              }}
            ></video>
          </div>
          <h3>
            <b>
              <i style={{ color: "black", marginLeft: "2%" }}>
                {this.state.name} :
              </i>
              <i style={{ color: "black", marginLeft: "2%" }}>
                {this.state.description}
              </i>
            </b>
          </h3>
        </div>
        <div className="barrow">
          {this.state.loading ? (
            <div className="center mt-19">
              {/* loader */}
              <br></br>
            </div>
          ) : (
            <div>
            
              {this.state.account == this.state.owner ? (
                <Paper className={classes.paper}>
                <div>
                  <img style={{width:"100%", height:"100px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_Z5Ernr5oHs2tB1OzYqtBA0iOpzjVWznzA&usqp=CAU"/>
                  <form
                    autoComplete="off"
                    noValidate
                    className={`${classes.root} ${classes.form}`}
                    onSubmit={(event) => {
                      event.preventDefault();
                      const name = "";
                      const description = "";
                      this.uploadSpecialSwag(name, description);
                    }}
                  >
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                      onChange={this.captureFile}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AddAPhotoIcon />
                      </IconButton>
                    </label>
                    <div className={classes.fileInput}></div>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      className={classes.buttonSubmit}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Poster NFT
                    </Button>
                  </form>

                  
                  <form
                    autoComplete="off"
                    noValidate
                    className={`${classes.root} ${classes.form}`}
                    onSubmit={(event) => {
                      event.preventDefault();
                      const quantity = this.state.quantity;
                      const cost = this.state.cost;
                      this.uploadSwag(quantity, cost);
                    }}
                  >
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                      onChange={this.captureFile}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AddAPhotoIcon />
                      </IconButton>
                    </label>
                    <br></br>
                    <TextField
                      name="name"
                      variant="outlined"
                      label="Quantity"
                      fullWidth
                      size="small"
                      value={this.state.value}
                      onChange={this.setQuantity}
                    />
                    <TextField
                      name="description"
                      variant="outlined"
                      label="Cost"
                      fullWidth
                      size="small"
                      value={this.state.value}
                      onChange={this.setCost}
                    />
                    <div className={classes.fileInput}></div>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      className={classes.buttonSubmit}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Swag NFT
                    </Button>
                  </form>
                  
                  <h1></h1>
                  
                  <div>
                    <form onSubmit={this.addItem}>
                      <input
                        ref={(a) => (this._inputElement = a)}
                        placeholder="Sub Owner Address"
                        type="address"
                      ></input>
                      <input
                        ref={(b) => (this.b = b)}
                        type="number"
                        placeholder="Share"
                      ></input>
                      <Button 
                      style = {{borderRadius:100, marginLeft: "42%"}}
                      type="submit">Add</Button>
                    </form>

                    {console.log(this.state.items)}
                    {console.log(this.state.itemms)}
                  </div>
                  {console.log(
                    this.state.tokenId,
                    this.state.items,
                    this.state.itemms
                  )}
                  <h1></h1>
                  <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      
                      style = {{borderRadius:100, marginLeft: "25%"}}
                      onClick={() => {
                        this.x(
                          this.state.tokenId,
                          this.state.items,
                          this.state.itemms
                        );
                      }}
                    >
                      Add Fractional Owners
                    </Button>
                </div>
                </Paper>
              ) : (
                <div>
                  <div style={{marginLeft: "32%", marginRight: "32%", marginTop:"5%"}}>
                  
                  <Card>
                      <CardContent>
                        <p style={{ color: "black" , marginLeft: "30%"}}>POSTER NFT</p>
                        <img src={a} style={{alignItems:"center"}}>
                        </img>
                      </CardContent>
                  </Card>
                  </div >
                  <h1></h1>
                  <div style={{margin:"5%"}}>
                  <Card>
                      <CardContent>
                        <p style={{ color: "black" , marginLeft: "45%"}}>SWAG NFTS</p>
                        <Button><img src={b} style={{width:"180px", height: "180px", marginLeft: "3%"}}>
                        </img></Button>
                        <Button><img src={c} style={{width:"180px", height: "180px",marginLeft: "3%"}}>
                        </img></Button>
                        <Button><img src={d} style={{width:"180px", height: "180px",marginLeft: "3%"}}>
                        </img></Button>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0.05 ETH
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0.07ETH
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0.01 ETH
                        </p>

                      </CardContent>
                  </Card>
                  </div>

                      
                </div>
              )}
            
            </div>
          )}
          
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Screen);
