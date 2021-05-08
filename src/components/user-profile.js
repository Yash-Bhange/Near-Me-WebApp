import React ,{Component} from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import { withRouter } from "react-router";

import firebase from '../helper/firebase'



class UserProfile extends Component{  

constructor(props){
      super(props);

      this.state = {
          userid:null,
          userInfo:null
      };
      var val= String(this.props.match.params.ID);
      this.setState({userid:val})
      this.loadUserDetails=this.loadUserDetails.bind(this);

      
    
    
     

};
  
  
  
async componentWillMount(){
   
await this.loadUserDetails();
      
}

 loadUserDetails(){
    
    console.log("yash"+this.state.userid)
    firebase.firestore().collection('users').where('uid','==',String(this.state.userid)).get().then((snapshot=>{
       
        console.log(snapshot.docs)
        snapshot.forEach(function(doc){
            console.log(doc.data())
        })
       
          })).catch((err)=>{
              console.log("error : "+err)
          })

}




  
render(){
             
      return (
      <div> 
              <p>{this.state.userInfo}</p>
     

      </div>
            );
  
}
   
}
  
  export default withRouter(UserProfile);