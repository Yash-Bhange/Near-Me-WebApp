
import React ,{Component} from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import './App.css';

import Login from './components/login.js'
import Register from './components/register.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component{

  constructor(props){
    super(props);

    //get loggedin uuser using localstoareg.getitem('user)

};

render(){

  return (
        <div>
                  

                <BrowserRouter>
                
                <Switch>
                      <Route exact path="/login" component={()=><Login />} />
                      <Route exact path="/register" component={()=><Register />} />
                  
                </Switch>
  
                </BrowserRouter>
        </div>
  );

}
  
}

export default App;
