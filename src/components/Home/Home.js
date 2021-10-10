import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import './Home.css';
import Carousel from 'react-bootstrap/Carousel'
import first from "./1.jpg"
import second from "./2.jpg"
import third from "./3.jpg"
class Home extends Component {

  render() {

    return (
      <div className="hnot-found">
    
      <div className = "hforgif">
        <Carousel fade>
          <Carousel.Item>
            <img
              style={{width:"100%", height: "540px"}}
              src= {first}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{width:"100%", height: "540px"}}
              src={second}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{width:"100%", height: "540px"}}
              src={third}
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
  
        <div
          class={`nav-item  ${location.pathname === "/upload" ? "active" : ""
            }`}

            className="harrow"  
        >
          <div className = "hbutton">

          <Card style={{ width: '35rem' }}>
            <Card.Img variant="top" src="https://alrehabcloud.com/wp-content/uploads/2017/06/Motion-Graphics-EX1.gif" />
            <Card.Body>
              <Card.Title style={{alignItems: "center"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CREATE YOUR CARNIVAL</Card.Title>
              <div className="innerButton">
              <Button
                  color="white"
                  size="small"
                >
                  <Link class="nav-link" to="/upload"  style={{ color: "#fd535b"}} >
                    Create Carnival
                  </Link>
                </Button>
              </div>
            </Card.Body>
          </Card>
            
          </div>
        </div>
    
    </div>
    );
  }
}

export default Home;