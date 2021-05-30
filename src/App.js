import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import "./App.css";

import Login from "./components/login.js";
import Register from "./components/register.js";
import RegisterAdmin from "./components/registerAdmin.js";
import Review from "./components/review.js";
import Explore from "./components/explore.js";
import UserProfile from "./components/user-profile.js";
import Help from "./components/help.js";
import About from "./components/aboutUs.js";
import ServiceProviderProfile from "./components/service-provider-profile.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: null,
      email: null,
      isProvider: null,
    };
    this.loadUser = this.loadUser.bind(this);
    this.logout = this.logout.bind(this);
    this.ProfileHandler = this.ProfileHandler.bind(this);
  }
  async componentWillMount() {
    await this.loadUser();
  }

  async loadUser() {
    const user = localStorage.getItem("user");
    const loggedInUser = user != null ? JSON.parse(user) : null;
    if (loggedInUser == null) {
    } else {
      this.setState({
        email: loggedInUser.email,
        isProvider: loggedInUser.isProvider,
        userid: loggedInUser.userid,
      });
    }
  }
  logout() {
    localStorage.setItem("user", null);
    window.alert("logged out of session !");
  }

  ProfileHandler() {
    const user = localStorage.getItem("user");
    const loggedInUser = user != null ? JSON.parse(user) : null;
    if (loggedInUser == null) {
      window.location.href = "/login";
    } else {
      if (this.state.isProvider == true) {
        window.location.href = "/service-provider-profile/" + this.state.userid;
      } else {
        window.location.href = "/user-profile/" + this.state.userid;
      }
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <ul class="main-navigation">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/explore">Find</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li id="account">
                <Link to="#">Accounts</Link>

                <ul>
                  <li>
                    <a href="#" onClick={this.ProfileHandler}>
                      Profile
                    </a>
                  </li>
                  {this.state.userid == null ? (
                    <li>
                      <a href="login">Login</a>
                    </li>
                  ) : (
                    <li>
                      <a href="#" onClick={this.logout}>
                        Logout
                      </a>
                    </li>
                  )}

                  <li>
                    <a href="#">Register as</a>
                    <ul>
                      <li>
                        <a href="register">Normal user</a>
                      </li>
                      <li>
                        <a href="registerAdmin">Service Provider</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <Switch>
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/register" component={() => <Register />} />
            <Route
              exact
              path="/registerAdmin"
              component={() => <RegisterAdmin />}
            />
            <Route exact path="/review" component={() => <Review />} />
            <Route
              exact
              path="/explore"
              component={() => (
                <>
                  <Explore />
                </>
              )}
            />
            <Route
              exact
              path="/user-profile/:ID"
              component={() => <UserProfile />}
            />
            <Route
              path="/service-provider-profile/:ID"
              exact
              component={() => <ServiceProviderProfile />}
            />
            <Route
              path="/help"
              exact
              component={() => <Help />}
            />
            <Route
              path="/about"
              exact
              component={() => <About />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
