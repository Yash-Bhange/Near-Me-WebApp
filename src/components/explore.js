import React, { Component } from "react";
import DataListInput from "react-plain-datalist-input";
import axios from "axios";

import firebase from "../helper/firebase";
import { Result } from "./Result";
import "../components_css/explore.css";

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occupation: "",
      keywords: "",
      providers: [],
      found: 1,
      longitude: null,
      latitude: null,
      city: "",
    };

    this.loadkeywords = this.loadkeywords.bind(this);
    this.occupationOnChangeHandler = this.occupationOnChangeHandler.bind(this);
    this.go = this.go.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getCordinates = this.getCordinates.bind(this);
    this.getCity = this.getCity.bind(this);
  }

  async componentWillMount() {
    var items = [{ item: "fetching.." }];
    this.setState({ keywords: items });
    await this.loadkeywords();
  }

  async loadkeywords() {
    firebase
      .firestore()
      .collection("occupations")
      .get()
      .then((snapshot) => {
        let array = [];
        snapshot.docs.forEach((doc) => {
          var Item = {
            key: doc.data().key,
            item: doc.data().item,
          };
          array.push(Item);
        });

        this.setState({
          keywords: array,
        });
      })
      .catch((err) => {
        console.log("error : " + err);
      });
  }

  occupationOnChangeHandler(event) {
    this.setState({ occupation: event.target.value });
    console.log(this.state.occupation);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCordinates);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  async getCordinates(position) {
    // console.log(
    //   `Latitude: ${position.coords.latitude} ,Longitude: ${position.coords.longitude}`
    // );
    this.setState({ latitude: position.coords.latitude });
    this.setState({ longitude: position.coords.longitude });
    await this.getCity();
    console.log(this.state.city);
  }
  async getCity() {
    var lat = this.state.latitude;
    var lng = this.state.longitude;
    console.log(lat,lng)
//pk.632d0cb01fd6f28de3de49ef1903fb06
    const api = axios.create({
      baseURL: `https://us1.locationiq.com/v1/reverse.php?key=pk.632d0cb01fd6f28de3de49ef1903fb06&lat=${lat}&lon=${lng}&format=json`,
    });


    let res = await api.get("");
    console.log(res.data.address.city);

    this.setState({ city: res.data.address.city });
  }

  go() {
    if (this.state.occupation === "") {
      alert("Please Provide Occupation !");
    }
    if (this.state.city === "") {
      alert("Please Provide Location !");
    } else {
      console.log(this.state.occupation);
      firebase
        .firestore()
        .collection("serviceProviders")
        .where("occupation", "==", this.state.occupation.toLowerCase())
        .where("location", "==", this.state.city)
        .get()
        .then((snapshot) => {
          console.log("exce");

          var array1 = [];
          console.log("LENGTH" + snapshot.docs.length);
          if (snapshot.docs.length === 0) {
            this.setState({ found: 0 });
          } else {
            this.setState({ found: 1 });

            snapshot.docs.forEach((doc) => {
              console.log(doc.data());
              var provider = {
                name: doc.data().name,
                location: doc.data().location,
                phone: doc.data().phone,
                uid: doc.data().uid,
              };
              array1.push(provider);
              // this.state.providers.push(provider)
              console.log("exce1");
              console.log("name:" + doc.data().name);
              //code to show service providers
              this.setState({ providers: array1 });
            });
          }
        })
        .catch((err) => {
          console.log("error : " + err);
        });
    }
  }

  render() {
    return (
      <div id="back-ground-span1">
        <div id="topSpace"></div>
        <div>
          <p id="title-form">EXPLORE!!</p>{" "}
        </div>

        <div className="form" id="explore_find">
          <form>
            <input
              list="occupation"
              placeholder="Enter Occupation"
              value={this.state.occupation}
              onChange={this.occupationOnChangeHandler}
            />
            <datalist id="occupation">
              {this.state.keywords.map((t) => (
                <option key={t.key} value={t.item} />
              ))}
            </datalist>
            <br></br>
            <br></br>
            {this.state.city == "" ? (
              ""
            ) : (
              <p>
                <i class="fas fa-map-marked fa-2x"></i> <span></span>
                {this.state.city}
              </p>
            )}
            <button type="button" onClick={this.getLocation}>
              Set Location
            </button>
          </form>
          <button className="Search" onClick={this.go}>
            <i class="fas fa-search fa-2x"></i>
          </button>
        </div>

        <div className="results">
          {this.state.found == 0 ? (
            <p>"No Service Provide available"</p>
          ) : (
            this.state.providers.map((provider) => {
              return <Result provider={provider} />;
            })
          )}
        </div>
      </div>
    );
  }
}

export default Explore;
