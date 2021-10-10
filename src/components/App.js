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
    
      // const { authenticate, isAuthenticated, user } = useMoralis();

      // if (!isAuthenticated) {
      //   return (
      //     <div className="not-found">

      //       <div style={{marginLeft: "50%"}}></div>
  
      
      //       <div
      //         class={`nav-item  ${location.pathname === "/upload" ? "active" : ""
      //           }`}
    
      //           className="arrow"  
      //       >
      //         <div className = "button">
    
      //         <Card style={{ width: '25rem' }}>
      //           <Card.Img variant="top" style = {{width:"100%", height: "10%"}} src="https://i.pinimg.com/originals/7d/52/da/7d52da681113c77e9b81a879130f2f21.gif" />
      //           <Card.Body>
      //             <Card.Title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WELCOME TO THE CARNIVAL</Card.Title>
      //             <Card.Text>
                    
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