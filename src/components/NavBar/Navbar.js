import React from "react";
import { Link, withRouter } from "react-router-dom";
import icon from './photo.png';
import Button from "@material-ui/core/Button";

// Website NavBar
function Navigation(props) {
  return (
    <div className="navigation">
      <div style={{ opacity: 0}} ></div>
      <nav class="py-1 navbar navbar-expand-sm" style={{backgroundColor:'white' }}>
        <div class="container">
          <Link className="btn" to="/"> <img src={icon} style={{ height: 50, width: 150}} alt="Logo" /> </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${props.location.pathname === "/" ? "active" : ""
                  }`}
              >
                <Button
                  color="white"
                  //variant="contained"
                  size="small"
                >
                  <Link class="nav-link" to="/" style={{ color: "blue" }}>
                    Home 
                    <span class="sr-only">(current)</span>
                  </Link>
                </Button>
              </li>
              <li
                class={`nav-item  ${props.location.pathname === "/feed" ? "active" : ""
                  }`}
              > <Button
                color="white"
                // variant="contained"
                size="small">
                  <Link class="nav-link" to="/feed" style={{ color: "blue" }} >
                    Feeds
                  </Link>
                </Button>
              </li>

              <li
                class={`nav-item  ${props.location.pathname === "/profile" ? "active" : ""
                  }`}
              >
                <Button
                  color="white"
                  size="small"
                >
                  <Link class="nav-link" to="/profile" style={{ color: "blue" }} >
                    My Profile
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>

      </nav>
    </div>
  );
}

export default withRouter(Navigation);