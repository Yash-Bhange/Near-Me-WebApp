import React ,{Component} from 'react';
import '../components_css/login.css';
import '../components_css/register.css';
import firebase from '../helper/firebase'



class Register extends Component{  

constructor(props){
      super(props);
      this.state = {name:'',email: '',password:''};
      this.submitHandler = this.submitHandler.bind(this);
      this.emailOnChangeHandler = this.emailOnChangeHandler.bind(this);
      this.passwordOnChangeHandler = this.passwordOnChangeHandler.bind(this);
      this.nameOnChangeHandler = this.nameOnChangeHandler.bind(this);

};
  
  
  
async componentWillMount(){
      //await this.loadWeb3()
      
}
//update name
nameOnChangeHandler(event){
    this.setState({name: event.target.value});
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
    document.getElementById('registerSubmitButton').innerHTML="Loading...";

firebase.auth()
.createUserWithEmailAndPassword(this.state.email,this.state.password)
.then(response=>{                      //succcessfull registration
    firebase.firestore().collection('users').add({
    email: this.state.email,
    name :this.state.name,
    password:this.state.password,
    uid:response.user.uid
    }).then((result)=>{
    console.log("result : "+result)
    alert("successfully registerd !")
    document.getElementById('registerSubmitButton').innerHTML="Submit";

    window.location.href='/home'

    }).catch((err)=>{
        console.log("error : "+err)
        document.getElementById('registerSubmitButton').innerHTML="Submit";
        alert("error occured")
    })

}).catch((err)=>{                  //failed in registration then...

    switch(err.code){
        case 'auth/email-already-in-use':
            console.log("auth/email-already-in-use");
            document.getElementById('registerSubmitButton').innerHTML="Submit";
            alert('auth/email-already-in-use')
            break;
        case 'auth/invalid-email':
            console.log("Invalid email");
            document.getElementById('registerSubmitButton').innerHTML="Submit";
            alert('auth/invalid-email')
            break;
        case 'auth/weak-password':
             console.log("weak password");
             alert('auth/weak-password')
            break;   
    }


})

}


  
render(){
             
      return (
                 
          
         
        <div>
             <form >
                 <h3>REGISTER</h3>
            
             <div className="form-group">
                    <label >Name</label>
                    <input  className="form-control"  type="text" value={this.state.name}  placeholder="Enter name" onChange={this.nameOnChangeHandler} />
            </div>
                
            <div className="form-group">
                    <label >Email address</label>
                    <input  className="form-control"   type="email" value={this.state.email}  placeholder="Enter email" onChange={this.emailOnChangeHandler} />
            </div>

            <div className="form-group">
            <label >Password</label>
                    <input  className="form-control"  type="password" value={this.state.password}  placeholder="Enter password" onChange={this.passwordOnChangeHandler} />

            </div>

                    
                  <div>
                  <a id="registerSubmitButton"  className="btn btn-primary btn-block" onClick={this.submitHandler} >Submit</a>

                  </div>
        
                
                
            </form>
      </div>
      
            );
  
}
   
}
  
  export default Register;
