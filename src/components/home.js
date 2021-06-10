import React ,{Component} from 'react';
import HeroSection from './HeroSection';
import Cards from './Cards.js'
import '../components_css/home.css';

class home extends Component{
 
    constructor(props){
        super(props);
    }

render(){

    return(  
      
            <div>
              <HeroSection/>
              <Cards/>
            
            </div>      
        );
        
    }
}

export default home;
