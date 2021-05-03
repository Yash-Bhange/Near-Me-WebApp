
import React ,{Component} from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import './App.css';

import Login from './components/login.js'
import Register from './components/register.js'
import RegisterAdmin from './components/registerAdmin.js'
import Review from './components/review.js'
import Explore from './components/explore.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component{

  constructor(props){
    super(props);

    //get loggedin uuser using localstoareg.getitem('user)

};

render(){

  return (
        <div> 
<div>
<ul class="main-navigation">
  <li><a href="/">Home</a></li>
  <li><a href="explore">Explore</a></li>
  <li><a href="#">Help/FAQ</a></li>
  <li><a href="#">About Us</a></li>
  <li id="account"><a href="#">Accounts</a>
    <ul>
      <li><a href="#">Profile</a></li>
      <li><a href="login">Login</a></li>
      <li><a href="#">Register as -></a>
        <ul >
          <li ><a href="register">Normal user</a></li>
          <li ><a href="registerAdmin">Service Provider</a></li>
        </ul>
      </li>
    
    </ul>
  </li>

</ul>
</div>
<br></br>
<div>
yash bhange
</div>

                  

                <BrowserRouter>
                
                <Switch>
                      <Route exact path="/login" component={()=><Login />} />
                      <Route exact path="/register" component={()=><Register />} />
                      <Route exact path="/registerAdmin" component={()=><RegisterAdmin />} />
                      <Route exact path="/review" component={()=><Review />} />
                      <Route exact path="/explore" component={()=><Explore />} />

                  
                </Switch>
  
                </BrowserRouter>
        </div>
  );

}
  
}

export default App;
