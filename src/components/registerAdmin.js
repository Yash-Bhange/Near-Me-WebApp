import React ,{Component} from 'react';
import '../components_css/register.css'
import firebase from '../helper/firebase'



class RegisterAdmin extends Component{  

constructor(props){
      super(props);
      this.state = {email: '',password:'',name:'',phone:'',location:'',occupation:'',keywords:''};
      this.submitHandler = this.submitHandler.bind(this);
      this.emailOnChangeHandler = this.emailOnChangeHandler.bind(this);
      this.passwordOnChangeHandler = this.passwordOnChangeHandler.bind(this);
      this.nameOnChangeHandler = this.nameOnChangeHandler.bind(this);
      this.phoneOnChangeHandler = this.phoneOnChangeHandler.bind(this);
      this.locationOnChangeHandler = this.locationOnChangeHandler.bind(this);
      this.occupationOnChangeHandler = this.occupationOnChangeHandler.bind(this);
      this.loadkeywords=this.loadkeywords.bind(this);

};
  
  
  
async componentWillMount(){
      
    var items=[{key:1,item:'fetching...'}]
    this.setState({keywords:items});
    await this.loadkeywords()

      
}


async loadkeywords(){
    firebase.firestore().collection('occupations').get().then((snapshot=>{
      let array=[];
      snapshot.docs.forEach((doc=>{
          array.push(doc.data())
      }))

      this.setState({
          keywords:array
      })
 


        })).catch((err)=>{
            console.log("error : "+err)
        })
}

//upadtes email
emailOnChangeHandler(event){
    this.setState({email: event.target.value});
}
//update name
nameOnChangeHandler(event){
    this.setState({name: event.target.value});
}
//update phone
phoneOnChangeHandler(event){
    this.setState({phone: event.target.value});
}
//update location
locationOnChangeHandler(event){
    this.setState({location: event.target.value});
}
//update location
occupationOnChangeHandler(event){
    this.setState({occupation: event.target.value});
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
    firebase.firestore().collection('serviceProviders').add({
    email: this.state.email,
    name : this.state.name,
    password:this.state.password,
    phone:this.state.phone,
    location:this.state.location,
    occupation:this.state.occupation,
    uid:response.user.uid
    }).then((result=>{
         console.log("result : "+result)
    })).catch((err)=>{
        console.log("error : "+err)
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
                <h3>Register As Admin</h3>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={this.state.name} className="form-control" placeholder="Enter name" onChange={this.nameOnChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={this.state.email} className="form-control" placeholder="Enter email" onChange={this.emailOnChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="text" value={this.state.phone} className="form-control" placeholder="Enter mobile number" onChange={this.phoneOnChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" value={this.state.location} className="form-control" placeholder="Enter city, district or town" onChange={this.locationOnChangeHandler} />
                </div>
                <div className="form-grou">
                    <label>Occupation</label> <br></br>
                    <input list="brow"  onChange={this.occupationOnChangeHandler}/>
                    <datalist id="brow" >
                        {this.state.keywords.map((t) =>
                        <option key={t.key} value={t.item} />
                        )}
                    </datalist>
                    
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
  
  export default RegisterAdmin;