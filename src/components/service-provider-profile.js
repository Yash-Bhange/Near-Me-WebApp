import React ,{Component} from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import { withRouter } from "react-router";
import firebase from '../helper/firebase'




class ServiceProviderProfile extends Component{  

constructor(props){
      super(props);
      this.state = {
        userid:null
    };
    this.setState({userid:this.props.match.params.ID})
     

};
  
  


  
render(){
             
      return (
      <div> 
                
     

      </div>
            );
  
}
   
}
  
  export default withRouter(ServiceProviderProfile);