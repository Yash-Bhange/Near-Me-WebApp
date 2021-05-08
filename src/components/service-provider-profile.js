import React ,{Component} from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import { withRouter } from "react-router";
import firebase from '../helper/firebase'




class ServiceProviderProfile extends Component{  

constructor(props){
      super(props);
      this.state = {
        userInfo:null
    };
    this.setState({userid:this.props.match.params.ID})
    this.loadUserDetails=this.loadUserDetails.bind(this);
     

};
  
  
async componentDidMount(){
   
    await this.loadUserDetails();
          
}
    
async loadUserDetails(){

    firebase.firestore().collection('serviceProviders').where('uid','==',String(this.props.match.params.ID)).get().then((snapshot=>{
        let localUser;
        snapshot.docs.forEach(function(doc){
            
            localUser=doc.data();
           
            
        })
        //this.setState({userInfo:localUser});
        
       
          })).catch((err)=>{
              console.log("error : "+err)
          })
        
}
  


  
render(){
             
      return (
      <div> 
                
     

      </div>
            );
  
}
   
}
  
  export default withRouter(ServiceProviderProfile);