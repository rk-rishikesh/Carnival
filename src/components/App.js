import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './NavBar/Navbar';
import Upload from './Upload/Upload';
import Home from './Home/Home';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import Screen from './NFTScreens/Screen';
import { useMoralis } from "react-moralis";
import './App.css';
import Card from 'react-bootstrap/Card'
import Button from "@material-ui/core/Button";
function App() {
    
      const { authenticate, isAuthenticated, user } = useMoralis();

      // if (!isAuthenticated) {
      //   return (
      //     <div className="not-found">

      //       <img className = "forgif" src="https://image.freepik.com/free-vector/carnival-design-with-colorful-balloons-canon-icon_24911-19736.jpg"/>
  
      
      //       <div
      //         class={`nav-item  ${location.pathname === "/upload" ? "active" : ""
      //           }`}
    
      //           className="arrow"  
      //       >
      //         <div className = "button">
    
      //         <Card style={{ width: '28rem' }}>
      //           <Card.Img variant="top" src="https://freepngimg.com/download/carnival/26215-4-carnival-photo.png" />
      //           <Card.Body>
      //             <Card.Title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WELCOME TO THE CARNIVAL</Card.Title>
      //             <Card.Text>
      //               Some quick example text to build on the card title and make up the bulk of
      //               the card's content.
      //             </Card.Text>
      //             <div className = "innerButton">
      //             <Button
      //                 color="white"
      //                 size="small"
      //                 onClick={() => authenticate()}
      //               >                  
      //                   Enter Carnival
      //               </Button>
      //             </div>
      //           </Card.Body>
      //         </Card>
                
      //         </div>
      //       </div>
        
      //   </div>
      //   );
      // }
        

      return (
        <div>
          {/* <h1>Welcome {user.get("username")}</h1> */}
        
    
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/upload" exact component={() => <Upload />} />
          <Route path="/feed" exact component={() => <Feed />} />
          <Route path="/profile" exact component={() => <Profile />} />
          <Route exact path="/screen/:id" render={(props) => (
              <Screen id={props.match.params.id}/>)} 
          />
        </Switch>
      </Router>
      </div>
    );

}

export default App;