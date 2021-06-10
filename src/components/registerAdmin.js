import React ,{Component} from 'react';
import '../components_css/register.css'
import firebase from '../helper/firebase'



class RegisterAdmin extends Component{  

constructor(props){
      super(props);
      this.state = {email: '',password:'',name:'',phone:'',location:'',occupation:'',pinCode:'',keywords:''};
      this.submitHandler = this.submitHandler.bind(this);
      this.emailOnChangeHandler = this.emailOnChangeHandler.bind(this);
      this.passwordOnChangeHandler = this.passwordOnChangeHandler.bind(this);
      this.nameOnChangeHandler = this.nameOnChangeHandler.bind(this);
      this.phoneOnChangeHandler = this.phoneOnChangeHandler.bind(this);
      this.locationOnChangeHandler = this.locationOnChangeHandler.bind(this);
      this.occupationOnChangeHandler = this.occupationOnChangeHandler.bind(this);
      this.loadkeywords=this.loadkeywords.bind(this);
      this.pinCodeOnChangeHandler=this.pinCodeOnChangeHandler.bind(this);

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
pinCodeOnChangeHandler(event){
    this.setState({pinCode: event.target.value});
}
//manages registration and firestore 
submitHandler(event){
document.getElementById('registerSubmitButton1').innerHTML="Loading...";
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
    pincode:this.state.pinCode,
    uid:response.user.uid
    }).then((result=>{
         console.log("result : "+result);
         alert("successfully registerd !")
         document.getElementById('registerSubmitButton1').innerHTML="Submit";
         window.location.href='/home'
    })).catch((err)=>{
        console.log("error : "+err);
        alert("Errpr Occured!")
        document.getElementById('registerSubmitButton1').innerHTML="Submit";
        
    })

}).catch((err)=>{                  //failed in registration then...

    switch(err.code){
        case 'auth/email-already-in-use':
            console.log("auth/email-already-in-use");
            alert("auth/email-already-in-use")
            document.getElementById('registerSubmitButton1').innerHTML="Submit";
            break;
        case 'auth/invalid-email':
            console.log("Invalid email");
            alert("auth/invalid-email")
            document.getElementById('registerSubmitButton1').innerHTML="Submit";
            break;
        case 'auth/weak-password':
             console.log("weak password");
             alert("auth/weak-password")
             document.getElementById('registerSubmitButton1').innerHTML="Submit";
            break;   
    }


})

}


  
render(){
             
      return (
                  <div id="back-ground-span1">
          <div id="topSpace">

          </div>
          <div><p id="title-form">REGISTER AS SERVICE PROVIDER</p> </div> 
        <div id="admin">
             <form id="register">
                <div className="form" id="main2">
                    <label class="field2">Name</label>
                    <input id="name" type="text" value={this.state.name} className="form-control" placeholder="Enter name" onChange={this.nameOnChangeHandler} />
             
                    <label class="field2">Email address</label>
                    <input id="email" type="email" value={this.state.email} className="form-control" placeholder="Enter email" onChange={this.emailOnChangeHandler} />
                
                    <label class="field2">Contact Number</label>
                    <input id="name" type="text" value={this.state.phone} className="form-control" placeholder="Enter mobile number" onChange={this.phoneOnChangeHandler} />
                
                    <label class="field2">Location</label>
                    <input id="name" type="text" value={this.state.location} className="form-control" placeholder="Enter city, district or town" onChange={this.locationOnChangeHandler} />
               
                    <label class="field2">PinCode</label>
                    <input id="name" type="text" value={this.state.pinCode} className="form-control" placeholder="Enter PinCode" onChange={this.pinCodeOnChangeHandler} />
             
                    <label class="field2">Occupation</label> <br></br>
                    <input id="name" list="brow"  onChange={this.occupationOnChangeHandler}/>
                    <datalist id="brow" >
                        {this.state.keywords.map((t) =>
                        <option key={t.key} value={t.item} />
                        )}
                    </datalist>
                    
                

                    <label class="field2">Password</label>
                    <input id="pass" type="password" value={this.state.password} className="form-control" placeholder="Enter password" onChange={this.passwordOnChangeHandler} />

                <br></br>

                <a id="registerSubmitButton1" className="btn btn-primary btn-block" onClick={this.submitHandler} >Submit</a>
                </div>
            </form>
      </div>
      </div>
            );
  
}
   
}
  
  export default RegisterAdmin;
