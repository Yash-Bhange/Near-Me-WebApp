import React, { Component } from "react";
import axios from "axios";

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
import { Link } from "react-router-dom";
import { Preview } from "./Preview.js";

class ServiceProviderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      workReviews: [],
      found: false,
      userid: null,
      email: null,
      isProvider: false,
      editable: false,
      docID: "",
      latitude: null,
      longitude: null,
      city: "",
    };

    this.loadUserDetails = this.loadUserDetails.bind(this);
    this.loadUserReview = this.loadUserReview.bind(this);
    this.editButton = this.editButton.bind(this);
    this.addReviewButton = this.addReviewButton.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.nameHandler = this.nameHandler.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    this.locationHandler = this.locationHandler.bind(this);
    this.mobileHandler = this.mobileHandler.bind(this);
    this.occupationHandler = this.occupationHandler.bind(this);
    this.pinCodeHandler = this.pinCodeHandler.bind(this);
    this.sortButton = this.sortButton.bind(this);
    this.resetLocation = this.resetLocation.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getCity = this.getCity.bind(this);
  }

  async componentDidMount() {
    await this.loadUserDetails();
    await this.loadUserReview();
    await this.loadUser();
  }

  nameHandler(event) {
    this.setState({
      userInfo: {
        name: event.target.value,
        email: this.state.userInfo.email,
        phone: this.state.userInfo.phone,
        location: this.state.userInfo.location,
        occupation: this.state.userInfo.occupation,
        pincode: this.state.userInfo.pincode,
      },
    });
  }
  emailHandler(event) {
    this.setState({
      userInfo: {
        name: this.state.userInfo.name,
        email: event.target.value,
        phone: this.state.userInfo.phone,
        location: this.state.userInfo.location,
        occupation: this.state.userInfo.occupation,
        pincode: this.state.userInfo.pincode,
      },
    });
  }
  locationHandler(event) {
    this.setState({
      userInfo: {
        location: event.target.value,
        name: this.state.userInfo.name,
        email: this.state.userInfo.email,
        phone: this.state.userInfo.phone,
        occupation: this.state.userInfo.occupation,
        pincode: this.state.userInfo.pincode,
      },
    });
  }
  mobileHandler(event) {
    this.setState({
      userInfo: {
        phone: event.target.value,
        occupation: this.state.userInfo.occupation,
        name: this.state.userInfo.name,
        email: this.state.userInfo.email,
        location: this.state.userInfo.location,
        pincode: this.state.userInfo.pincode,
      },
    });
  }
  occupationHandler(event) {
    this.setState({
      userInfo: {
        occupation: event.target.value,
        name: this.state.userInfo.name,
        email: this.state.userInfo.email,
        location: this.state.userInfo.location,
        phone: this.state.userInfo.phone,
        pincode: this.state.userInfo.pincode,
      },
    });
  }
  pinCodeHandler(event) {
    this.setState({
      userInfo: {
        pincode: event.target.value,
        name: this.state.userInfo.name,
        email: this.state.userInfo.email,
        location: this.state.userInfo.location,
        phone: this.state.userInfo.phone,
        occupation: this.state.userInfo.occupation,
      },
    });
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
        let docid;
        //console.log(snapshot.docs);
        snapshot.docs.forEach(function (doc) {
          localUser = doc.data();
          console.log(doc.id); //document Id needed to update ddocument
          docid = doc.id;
        });
        this.setState({ docID: docid });
        this.setState({ userInfo: localUser });
        // console.log(this.state.userInfo);
      })
      .catch((err) => {
        console.log("error : " + err);
      });
  }

  async loadUser() {
    const user = localStorage.getItem("user");
    const loggedInUser = user != null ? JSON.parse(user) : null;
    if (loggedInUser == null) {
      window.location.href = "/login";
    } else {
      this.setState({
        email: loggedInUser.email,
        isProvider: loggedInUser.isProvider,
        userid: loggedInUser.userid,
      });
    }
  }

  async loadUserReview() {
    firebase
      .firestore()
      .collection("reviews")
      .where("serviceProviderID", "==", String(this.props.match.params.ID))
      .get()
      .then((snapshot) => {
        var array1 = [];
        console.log("LENGTH" + snapshot.docs.length);
        if (snapshot.docs.length === 0) {
          this.setState({ found: false });
          console.log("ZERO");
        } else {
          console.log(snapshot.docs.length);

          snapshot.docs.forEach((doc) => {
            console.log(doc.data());
            var review = {
              title: doc.data().title,
              desc: doc.data().desc,
              amount: doc.data().amount,
              stars: doc.data().stars,
              review: doc.data().review,
              userID: doc.data().userID,
              date: doc.data().date,
            };
            array1.push(review);
            // this.state.providers.push(provider)
            console.log("exce1");

            //code to show service providers
            this.setState({ workReviews: array1 });
            this.setState({ found: true });
          });
        }
      })
      .catch((err) => {
        console.log("error : " + err);
      });
  }

  async editButton() {
    var buttonText = document.getElementById("EditSubmitButton").innerHTML;
    if (buttonText == "Edit") {
      const user = localStorage.getItem("user");
      const loggedInUser = user != null ? JSON.parse(user) : null;

      if (loggedInUser.userid != String(this.props.match.params.ID)) {
        alert("You don't have permission to edit ");
        return;
      } else {
        this.setState({
          editable: true,
        });

        document.getElementById("EditSubmitButton").innerHTML = "Update";
      }
    } else {
      //update function firbase

      var query = await firebase
        .firestore()
        .collection("serviceProviders")
        .doc(this.state.docID);

      query
        .update({
          name: this.state.userInfo.name,
          occupation: this.state.userInfo.occupation,
          email: this.state.userInfo.email,
          location: this.state.userInfo.location,
          phone: this.state.userInfo.phone,
          pincode: this.state.userInfo.pincode,
        })
        .then((query) => {
          alert("successfully Updated");
          document.getElementById("EditSubmitButton").innerHTML = "Edit";
          this.setState({
            editable: false,
          });
        })
        .catch((err) => {
          console.log(err);
          alert("err");
        });
    }
  }

  addReviewButton() {
    const user = localStorage.getItem("user");
    const loggedInUser = user != null ? JSON.parse(user) : null;

    if (loggedInUser.userid == String(this.props.match.params.ID)) {
      alert("you cannot add review to your own work");
      return;
    } else if (loggedInUser.isProvider == true) {
      alert("Service Provider cannot add review to another service provider");
      return;
    }
    var id = String(this.props.match.params.ID);
    window.location.href = "/addreview/" + id;
  }

  async sortButton(e) {
    const sorted = this.state.workReviews.sort(
      (a, b) => Number(b["stars"]) - Number(a["stars"])
    );

    console.log(sorted);
    this.setState({
      workReviews: sorted,
    });
  }

  resetLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getLocation);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  async getLocation(position) {
    console.log(
      `Latitude: ${position.coords.latitude} ,Longitude: ${position.coords.longitude}`
    );
    console.log(typeof this.state.latitude);
    this.setState({ latitude: position.coords.latitude });
    this.setState({ longitude: position.coords.longitude });

    await this.getCity();
    //console.log(a);
    // console.log("adsfadsf" + hash);
    var query = await firebase
      .firestore()
      .collection("serviceProviders")
      .doc(this.state.docID);

    query
      .update({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        location: this.state.city,
      })
      .then((query) => {
        alert("successfully Updated");
        document.getElementById("resetLocation").innerHTML = "Reset Location";
      })
      .catch((err) => {
        console.log(err);
        alert("err");
      });
  }

  async getCity() {
    var lat = this.state.latitude;
    var lng = this.state.longitude;

    const api = axios.create({
      baseURL: `http://api.positionstack.com/v1/reverse?access_key=ba90edb95b5567234d9e3ae0cc94f4d5&query=${lat},${lng}`,
    });

    let res = await api.get("");

    this.setState({ city: res.data.data[0].locality });
  }

  render() {
    return (
      <div id="back">
        <div id="accountHeader">
          <h3>Account Information</h3>
        </div>
        <br></br>

        <div id="profileDiv">
          <form>
            <label id="x1">Name </label> <br></br>
            {this.state.editable ? (
              <input
                id="formName"
                type="text"
                onChange={this.nameHandler}
                value={this.state.userInfo.name}
              />
            ) : (
              <input
                id="formName"
                type="text"
                readOnly
                onChange={this.nameHandler}
                value={this.state.userInfo.name}
              />
            )}
            <br></br>
            <br></br>
            <label id="x1">Email </label> <br></br>
            {this.state.editable ? (
              <input
                id="formEmail"
                type="text"
                onChange={this.emailHandler}
                value={this.state.userInfo.email}
              />
            ) : (
              <input
                id="formEmail"
                type="text"
                readOnly
                onChange={this.emailHandler}
                value={this.state.userInfo.email}
              />
            )}
            <br></br>
            <br></br>
            <label id="x1">Location </label> <br></br>
            {this.state.editable ? (
              <input
                id="formLocation"
                type="text"
                onChange={this.locationHandler}
                value={this.state.userInfo.location}
              />
            ) : (
              <input
                id="formLocation"
                type="text"
                readOnly
                onChange={this.locationHandler}
                value={this.state.userInfo.location}
              />
            )}
            <br></br>
            <br></br>
            <label id="x1">PinCode </label> <br></br>
            {this.state.editable ? (
              <input
                id="formLocation"
                type="text"
                onChange={this.pinCodeHandler}
                value={this.state.userInfo.pincode}
              />
            ) : (
              <input
                id="formLocation"
                type="text"
                readOnly
                onChange={this.pinCodeHandler}
                value={this.state.userInfo.pincode}
              />
            )}
            <br></br>
            <br></br>
            <label id="x1">Mobile</label> <br></br>
            {this.state.editable ? (
              <input
                id="formPhone"
                type="text"
                onChange={this.mobileHandler}
                value={this.state.userInfo.phone}
              />
            ) : (
              <input
                id="formPhone"
                type="text"
                readOnly
                onChange={this.mobileHandler}
                value={this.state.userInfo.phone}
              />
            )}
            <br></br>
            <br></br>
            <label id="x1">Occupation </label> <br></br>
            {this.state.editable ? (
              <input
                id="formOccupation"
                type="text"
                onChange={this.occupationHandler}
                value={this.state.userInfo.occupation}
              />
            ) : (
              <input
                id="formOccupation"
                type="text"
                readOnly
                onChange={this.occupationHandler}
                value={this.state.userInfo.occupation}
              />
            )}
            <br></br>
            <br></br>
          </form>
          {this.state.userid == this.props.match.params.ID ? (
            <button id="EditSubmitButton" onClick={this.editButton}>
              Edit
            </button>
          ) : (
            <span></span>
          )}
          &emsp; &emsp;
          {this.state.userid == this.props.match.params.ID ? (
            <button id="resetLocation" onClick={this.resetLocation}>
              Reset location
            </button>
          ) : (
            <span></span>
          )}
          &emsp; &emsp;
          {this.state.userid != this.props.match.params.ID &&
          this.state.isProvider != true ? (
            <button
              onClick={this.addReviewButton}
              id="addReviewButton"
              className="btn-primary "
            >
              Add Review<br></br>
              <span id="razorpayButtontext">Visible to all users</span>{" "}
            </button>
          ) : (
            <span></span>
          )}
          &emsp; &emsp;
          <a
            target="_blank"
            href="https://pages.razorpay.com/pl_HM6OLew1sO2kDi/view"
          >
            {" "}
            <button id="razorpayButton" className="btn-primary">
              Pay<br></br>
              <span id="razorpayButtontext">Powered by Razorpay</span>
            </button>
          </a>
        </div>
        <hr></hr>
        <div id="profileReview">
          <div id="profileReviewHeader">
            <h3 id="heading">Previous Work</h3>
            <button
              onClick={this.sortButton}
              id="sortButton"
              className="btn-primary "
            >
              sort by rating
            </button>
            <br></br>
            <br></br>
          </div>
          <br></br>
          <div id="reviewCards">
            {this.state.found == false ? (
              <div id="profileReviewHeader">
                <h6>No Previous Work available !</h6>
              </div>
            ) : (
              this.state.workReviews.map((review) => {
                return <Preview key={review.userID} review={review} />;
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ServiceProviderProfile);
