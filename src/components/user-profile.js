import React ,{Component} from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import { withRouter } from "react-router";

import firebase from '../helper/firebase'



class UserProfile extends Component{  

constructor(props){
      super(props);

      this.state = {
        name:'',
        email:'',
        password:'',
        uid:''
         
      };
 
      this.loadUserDetails=this.loadUserDetails.bind(this);

      
    
    
     

};
  
  
  
componentDidMount(){
   
 this.loadUserDetails();
      
}

loadUserDetails(){
    
    
    firebase.firestore().collection('users').where('uid','==',String(this.props.match.params.ID)).get().then((snapshot=>{
        let localUser;
        snapshot.docs.forEach(function(doc){
            
            localUser=doc.data();
           
            
        })
        this.setState({name:localUser.name,uid:localUser.uid,email:localUser.email,password:localUser.password});
    
       
          })).catch((err)=>{
              console.log("error : "+err)
          })

}




  
render(){
             
      return (
            <div> 
            
            
                <p>{this.state.name}</p>
            

            </div>
            );
  
}
   
}
  
  export default withRouter(UserProfile);