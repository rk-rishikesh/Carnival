import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Web3 from "web3";
import Carnival from "../../abis/Carnival.json";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { NFTStorage, File } from "nft.storage";
import { TextField, Paper } from "@material-ui/core";

//import { TextField, Paper, Typography } from "@material-ui/core";
//import bg from './trial.jpg';

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
    margin: "50px 100px 100px 100px ",
    width: "30%",
    height: "110%",
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

class Upload extends Component {
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
        image: new File([data], "trial.mp4", { type: "video/mp4" }),
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

  addItem(e) {
    if (this._inputElement.value !== "") {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now(),
      };

      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem),
        };
      });

      this._inputElement.value = "";
    }

    console.log(this.state.items);

    e.preventDefault();
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      carnival: null,
      contractAddress: null,
      loading: true,
      name: "",
      description: "",
      items: [],

    };
    this.uploadPost = this.uploadPost.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
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
                accept=".mp4, .mkv .ogg .wmv"
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
                label="Title"
                fullWidth
                value={this.state.value}
                onChange={this.setName}
              />
              <TextField
                name="description"
                variant="outlined"
                label="Description"
                fullWidth
                value={this.state.value}
                onChange={this.setDescription}
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                style = {{borderRadius:100}}
                className={classes.buttonSubmit}
                startIcon={<CloudUploadIcon/>}
              >
                Upload
              </Button>
            </form>

            <div>
              <form onSubmit={this.addItem}>
                <input
                  ref={(a) => (this._inputElement = a)}
                  placeholder="Add Sub Owner"
                ></input>
                <button type="submit">add</button>
              </form>
              {console.log(this.state.items)}
            </div>
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(Upload);
