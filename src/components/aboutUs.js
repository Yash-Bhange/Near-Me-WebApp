import React ,{Component} from 'react';
import '../components_css/aboutUs.css'
import firebase from '../helper/firebase'
import prakx from '../prakx.jpg'
import yash from '../yash.jpg'


class About extends Component{  

constructor(props){
      super(props);
      this.state = {email: '',name:'',msg:''};
      
};
  
  
  
async componentWillMount(){
      //await this.loadWeb3()
      
}




  
render(){
             
      return ( 
          <div> 
                
<div class="about-section">
  <h1>About Us </h1>
  <p>'Near-Me' Multi-Sevice App is an aggregator with IT-based digital platform which aims<br></br> to find win-win businnes opportunities for both th multi service app service and the service providers on an online platform.
</p>
  
</div>

<h2 id="ourteam">Our Team</h2>
<div class="row">
  <div class="column">
    <div class="card">
    
      <div class="container">
        <h2>Yash Bhange</h2>
        <p class="title">Developer</p>
        <p>Batch : T-8 <br></br>PRN : 2018BTECS00109</p>
        <p>yashbhange888@gmail.com</p>
        <a href="mailto:yashbhange888@gmail.com"><button class="button">Contact</button></a>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
    
      <div class="container">
        <h2>Tavishi Suvarna</h2>
        <p class="title">Developer</p>
        <p>Batch : T-8 <br></br>PRN : 2018BTECS00114</p>
        <p>suvarnatavishi7@gmail.com</p>
        <a href="mailto:yashbhange888@gmail.com"><button class="button">Contact</button></a>
      </div>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
    
      <div class="container">
        <h2>Prakash Singh</h2>
        <p class="title">Developer</p>
        <p>Batch : T-8 <br></br>PRN : 2018BTECS00100</p>
        <p>prakx@gmail.com</p>
        <a href="mailto:yashbhange888@gmail.com"><button class="button">Contact</button></a>
      </div>
    </div>
  </div>
</div>

          </div>
      
            );
  
}
   
}
  
  export default About;