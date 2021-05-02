import React ,{Component} from 'react';
import '../components_css/login.css'
import firebase from '../helper/firebase'



class Register extends Component{  

constructor(props){
      super(props);
      this.state = {email: '',password:''};
      this.submitHandler = this.submitHandler.bind(this);
      this.emailOnChangeHandler = this.emailOnChangeHandler.bind(this);
      this.passwordOnChangeHandler = this.passwordOnChangeHandler.bind(this);

};
  
  
  
async componentWillMount(){
      //await this.loadWeb3()
      
}
//upadtes email
emailOnChangeHandler(event){
    this.setState({email: event.target.value});
}
//updates password
passwordOnChangeHandler(event){
    this.setState({password: event.target.value});
}
//manages registration and firestore 
submitHandler(event){

firebase.auth()
.createUserWithEmailAndPassword(this.state.email,this.state.password)
.then(response=>{                      //succcessfull registration
    firebase.firestore().collection('users').add({
    email: "yashbhang888@gmail.com",
    name : "Yash Bhange",
    password:"yo",
    phone:"89388343",
    uid:response.user.uid
    },(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("successfully updates")
        }
    })

}).catch((err)=>{                  //failed in registration then...

    switch(err.code){
        case 'auth/email-already-in-use':
            console.log("auth/email-already-in-use");
            break;
        case 'auth/invalid-email':
            console.log("Invalid email");
            break;
        case 'auth/weak-password':
             console.log("weak password");
            break;   
    }


})

}


  
render(){
             
      return (
      <div>
             <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={this.state.email} className="form-control" placeholder="Enter email" onChange={this.emailOnChangeHandler} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={this.state.password} className="form-control" placeholder="Enter password" onChange={this.passwordOnChangeHandler} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <a  className="btn btn-primary btn-block" onClick={this.submitHandler} >Submit</a>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
      </div>
            );
  
}
   
}
  
  export default Register;