import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import './Home.css';
import Carousel from 'react-bootstrap/Carousel'

class Home extends Component {

  render() {

    return (
      <div className="hnot-found">
    
      <div className = "hforgif">
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShxYOZ1bSXQfALQHskfZLEFgMtGs4txfq2zQ&usqp=CAU"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShxYOZ1bSXQfALQHskfZLEFgMtGs4txfq2zQ&usqp=CAU"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShxYOZ1bSXQfALQHskfZLEFgMtGs4txfq2zQ&usqp=CAU"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
  
        <div
          class={`nav-item  ${location.pathname === "/upload" ? "active" : ""
            }`}

            className="harrow"  
        >
          <div className = "hbutton">

          <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src="https://alrehabcloud.com/wp-content/uploads/2017/06/Motion-Graphics-EX1.gif" />
            <Card.Body>
              <Card.Title>CREATE YOUR CARNIVAL</Card.Title>
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