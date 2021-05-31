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
import { Link } from "react-router-dom";
import {Preview}  from "./Preview.js";
class ServiceProviderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      workReviews: [], 
      found:false,
      userid: null,
      email: null,
      isProvider: null,
      editable :false,
      docID:'',

    };
    this.setState({ userid: this.props.match.params.ID });
    this.loadUserDetails = this.loadUserDetails.bind(this);
    this.loadUserReview=this.loadUserReview.bind(this);
    this.editButton=this.editButton.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.nameHandler=this.nameHandler.bind(this);
    this.emailHandler=this.emailHandler.bind(this);
    this.locationHandler=this.locationHandler.bind(this);
    this.mobileHandler=this.mobileHandler.bind(this);
    this.occupationHandler=this.occupationHandler.bind(this);
  }

  async componentDidMount() {
    await this.loadUserDetails();
    await this.loadUserReview();
    await this.loadUser();
  }



  nameHandler(event){
    this.setState({
      userInfo:{
        name:event.target.value,
        email:this.state.userInfo.email,
        phone:this.state.userInfo.phone,
        location:this.state.userInfo.location,
        occupation :this.state.userInfo.occupation,

        
      }
    });
  
  }
  emailHandler(event){
    this.setState({
      userInfo:{
        name:this.state.userInfo.name,
        email:event.target.value,
        phone:this.state.userInfo.phone,
        location:this.state.userInfo.location,
        occupation :this.state.userInfo.occupation,
      }
    });
  }
  locationHandler(event){
    this.setState({
      userInfo:{
        location:event.target.value,
        name:this.state.userInfo.name,
        email:this.state.userInfo.email,
        phone:this.state.userInfo.phone,
        occupation :this.state.userInfo.occupation,
      }
    });
  }
  mobileHandler(event){
    this.setState({
      userInfo:{
        phone:event.target.value,
        occupation :this.state.userInfo.occupation,
        name:this.state.userInfo.name,
        email:this.state.userInfo.email,
        location:this.state.userInfo.location,
      }
    });
  }
  occupationHandler(event){
    this.setState({
      userInfo:{
        occupation:event.target.value,
        name:this.state.userInfo.name,
        email:this.state.userInfo.email,
        location:this.state.userInfo.location,
        phone:this.state.userInfo.phone,
      }
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
          docid=doc.id;
          
        });
        this.setState({docID:docid})
        this.setState({ userInfo: localUser });
        console.log(this.state.userInfo);
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

async loadUserReview(){
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
            console.log("ZERO" )

          }
          else{
            
             console.log(snapshot.docs.length)
            
            snapshot.docs.forEach((doc) => {
              console.log(doc.data());
              var review = {
                title: doc.data().title,
                desc: doc.data().desc,
                amount: doc.data().amount,
                stars: doc.data().stars,
                review:doc.data().review,
                userID:doc.data().userID
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

 async editButton(){

  var buttonText=document.getElementById("EditSubmitButton").innerHTML;
  if(buttonText=='Edit'){

    
          const user = localStorage.getItem("user");
          const loggedInUser = user != null ? JSON.parse(user) : null;

          if(loggedInUser.userid!=String(this.props.match.params.ID)){

            alert("You don't have permission to edit ")
            return ;
          }
          else{

            this.setState({
              editable:true
            })

            document.getElementById("EditSubmitButton").innerHTML="Update";
            
          }

  }else{

    //update function firbase

  var query= await firebase.firestore().collection("serviceProviders").doc(this.state.docID);
     
      query.update({
          name:this.state.userInfo.name,
          occupation:this.state.userInfo.occupation,
          email:this.state.userInfo.email,
          location:this.state.userInfo.location,
          phone:this.state.userInfo.phone,

      })
      .then((query)=>{
        
        alert("successfully Updated");
        document.getElementById("EditSubmitButton").innerHTML="Edit";
        this.setState({
          editable:false
        })
      })
      .catch(err=>{
        console.log(err);
        alert("err")
      })

  }


}



  render() {
    return (
      


      <div>
         <div id="accountHeader">
           <h3>Account Information</h3>
         </div>
         <br></br>

        <div id="profileDiv">
          <form>
            <label>Name </label> <br></br>
            {this.state.editable ?
                <input id="formName" type="text"  onChange={this.nameHandler} value={this.state.userInfo.name}/>
                :
                <input id="formName" type="text" readOnly onChange={this.nameHandler} value={this.state.userInfo.name}/> 
            }
            <br></br><br></br>
            
            <label>Email </label> <br></br>
            {this.state.editable ?
                <input id="formEmail" type="text"  onChange={this.emailHandler} value={this.state.userInfo.email}/>
                :
                <input id="formEmail" type="text" readOnly onChange={this.emailHandler} value={this.state.userInfo.email}/>
            }
            <br></br><br></br>

            
            <label>Location </label> <br></br>
            {this.state.editable ?
                <input id="formLocation" type="text"  onChange={this.locationHandler} value={this.state.userInfo.location}/>
                :
                <input id="formLocation" type="text" readOnly onChange={this.locationHandler} value={this.state.userInfo.location}/>
            }
            <br></br><br></br>

            <label>Mobile</label> <br></br>
            {this.state.editable ?
                <input id="formPhone" type="text"  onChange={this.mobileHandler} value={this.state.userInfo.phone}/>
                :
                <input id="formPhone" type="text" readOnly onChange={this.mobileHandler} value={this.state.userInfo.phone}/>
            }
            <br></br><br></br>

            <label>Occupation </label> <br></br>
            {this.state.editable ?
                 <input id="formOccupation" type="text" onChange={this.occupationHandler} value={this.state.userInfo.occupation}/> 
                :
                <input id="formOccupation" type="text" readOnly onChange={this.occupationHandler} value={this.state.userInfo.occupation}/>
            }
            <br></br><br></br>

          </form>
          <button id="EditSubmitButton" onClick={this.editButton}>Edit</button> &emsp; &emsp; <button id="addReviewButton">Add Review </button>

        </div>
        <hr></hr>
        <div id="profileReview">
            <div id="profileReviewHeader">
                  <h5>Previous Work</h5>
            </div>
            <br></br>
            <div id="reviewCards">

            {this.state.found == false
            ? "No Reviews Available"
            : this.state.workReviews.map((review) => {
              return <Preview key={review.userID} review={review}/>;
            })}



            </div>

           


        </div>

    </div>




    );
  }
}

export default withRouter(ServiceProviderProfile);