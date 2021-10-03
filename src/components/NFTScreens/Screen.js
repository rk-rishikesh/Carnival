import React, { Component } from "react";
import {
  useParams,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
//import Upload from './Upload/Upload';
import "./Screen.css";
import { TextField, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Web3 from "web3";
import Carnival from "../../abis/Carnival.json";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { NFTStorage, File } from "nft.storage";

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
    margin: "100px 130px ",
    width: "60%",
    height: "60%",
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
    margin: "10px 0",
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
  // handle input change
  handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };

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

  uploadPost = (name, description) => {
    this.setState({ loading: true });

    const data = this.state.buffer;

    async function getMetadata() {
      console.log("metadata");
      const metadata = await client.store({
        name: name,
        description: description,
        image: new File([data], 'trial.jpg', { type: 'image/jpg' }),
      });
      console.log("metadata", metadata);
      return metadata.url;
    }

    const metadata = getMetadata();

    console.log(metadata);

    metadata.then(async (value) => {
      this.state.carnival.methods
        .uploadVideo(this.state.account, value)
        .send({ from: this.state.account })
        .on("transactionHash", (hash) => {
          this.setState({ loading: false });
        });

      console.log(value);
    });

    this.setState({ loading: false });
  };

  setName = (event) => {
    this.setState({ name: event.target.value });
  };

  setDescription = (event) => {
    this.setState({ description: event.target.value });
  };

constructor(props) {
    super(props);
    this.state = {
      account: "",
      carnival: null,
      contractAddress: null,
      loading: true,
      name: "",
      description: "",
    };
    this.uploadPost = this.uploadPost.bind(this);
    this.captureFile = this.captureFile.bind(this);
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className="not-found">
        <div style={{marginLeft: "2%"}}></div>
        <div className="card mb-4">
          <div>
            <video
              src="https://youtu.be/Il0S8BoucSA"
              controls
              style={{ width: "800px" }}
            ></video>
          </div>
          <h3>
            <b>
              <i style={{ color: "black", marginLeft: "2%" }}>
                Token Id: {this.props.id}
              </i>
            </b>
          </h3>
        </div>
        <div className="barrow">
        {this.state.loading ? (
          <div className="center mt-19">
            {/* loader */}
            <br></br>
            <img
              src="https://media.giphy.com/media/Daw1ObwDEeHja/giphy.gif"
              style={{
                marginLeft: "25%",
                width: "50%",
                justifyContent: "center",
              }}
            ></img>
          </div>
        ) : (
        <Paper className={classes.paper}>
          <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={(event) => {
                event.preventDefault();
                const name = this.state.name;
                const description = this.state.description;
                this.uploadPost(name, description);
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
                Upload
              </Button>
            </form>
            <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={(event) => {
                event.preventDefault();
                const name = this.state.name;
                const description = this.state.description;
                this.uploadPost(name, description);
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
                value={this.state.value}
                onChange={this.setName}
              />
              <TextField
                name="description"
                variant="outlined"
                label="Cost"
                fullWidth
                value={this.state.value}
                onChange={this.setDescription}
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
                Upload
              </Button>
            </form>
          </Paper>
        )}
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Screen);
