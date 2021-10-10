import React, { Component } from "react";
import Web3 from "web3";
import "./Profile.css";
import x from "./halloween.png"
import y from "./spidy.png";
class Profile extends Component {
  render() {
    return (
      <div>
        <div class="row py-5 px-4">
          <div class="col-md-5 mx-auto">
            <div class="bg-white shadow rounded overflow-hidden">
              <div class="px-4 pt-0 pb-4 cover">
                <div class="media align-items-end profile-head">
                  <div class="profile mr-3">
                    <img
                      src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                      alt="..."
                      width="130"
                      class="rounded mb-2 img-thumbnail"
                    />
                  </div>
                  <div class="media-body mb-5 text-white">
                    <h4 class="mt-0 mb-0">Account Address</h4>
                    <p class="small mb-4">
                      {" "}
                      <i class="fas fa-map-marker-alt mr-2"></i>0x63853F89ba59dC2610D8Fb375185e8bec3CB3f51
                    </p>
                  </div>
                </div>
              </div>
              <div class="bg-light p-4 d-flex justify-content-end text-center">
                <ul class="list-inline mb-0">
                  <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 d-block">2</h5>
                    <small class="text-muted">
                      {" "}
                      <i class="fas fa-image mr-1"></i>Carnivals
                    </small>
                  </li>
                  <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 d-block">4</h5>
                    <small class="text-muted">
                      {" "}
                      <i class="fas fa-user mr-1"></i>Views
                    </small>
                  </li>
                </ul>
              </div>
              
              <div class="py-4 px-4">
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <h5 class="mb-0">My Carnivals</h5>
                </div>
                <div class="row">
                  <div class="col-lg-6 mb-2 pr-lg-1">
                    <img
                      src={x}
                      alt=""
                      class="img-fluid rounded shadow-sm"
                    />
                  </div>
                  <div class="col-lg-6 mb-2 pl-lg-1">
                    <img
                      src={y}
                      alt=""
                      class="img-fluid rounded shadow-sm"
                    />
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
