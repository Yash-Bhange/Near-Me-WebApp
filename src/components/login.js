import React ,{Component} from 'react';
import '../components_css/login.css'
import firebase from '../helper/firebase'


class Login extends Component{  

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
emailOnChangeHandler(event){
    this.setState({email: event.target.value});
}
passwordOnChangeHandler(event){
    this.setState({password: event.target.value});
}

submitHandler(){

firebase.auth()
.signInWithEmailAndPassword(this.state.email,this.state.password)
.then(response=>{
    const {user}=response;
    const data={
        userid:user.uid,
        email:user.email,

    };
    
    localStorage.setItem('user',JSON.stringify(data));
    const storage =localStorage.getItem('user');
    const loggedInUser=  storage !=null?JSON.parse(storage):null;
    console.log("loggedInUser : "+loggedInUser.email)

}).catch(err=>{
    console.log(err);
})





}


  
render(){
             
      return (
      <div>
             <form>
                <h3>Sign In</h3>

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
  
  export default Login;