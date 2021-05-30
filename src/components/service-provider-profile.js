import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";
import { withRouter } from "react-router";
import firebase from "../helper/firebase";
import "../components_css/providerView.css";

class ServiceProviderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
    this.setState({ userid: this.props.match.params.ID });
    this.loadUserDetails = this.loadUserDetails.bind(this);
  }

  async componentDidMount() {
    await this.loadUserDetails();
  }

  async loadUserDetails() {
    console.log(this.props);
    firebase
      .firestore()
      .collection("serviceProviders")
      .where("uid", "==", String(this.props.match.params.ID))
      .get()
      .then((snapshot) => {
        let localUser;
        snapshot.docs.forEach(function (doc) {
          localUser = doc.data();
        });
        this.setState({ userInfo: localUser });
        console.log(this.state.userInfo);
      })
      .catch((err) => {
        console.log("error : " + err);
      });
  }

  render() {
    return (
      <div className="prodviderpage">
        <p className="title">{this.state.userInfo.name}</p>
        <p className="title">{this.state.userInfo.occupation}</p>
        <p className="title">{this.state.userInfo.location}</p>
        <p className="title">
          <i class="fas fa-phone"></i> {this.state.userInfo.phone}
        </p>
        <div>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
        </div>
      </div>
    );
  }
}

export default withRouter(ServiceProviderProfile);
