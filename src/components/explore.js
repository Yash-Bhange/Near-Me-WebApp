import React ,{Component} from 'react';
import DataListInput from "react-plain-datalist-input";

import firebase from '../helper/firebase'


class Explore extends Component{  

constructor(props){
      super(props);
      this.state = {occupation:'',keywords:''};
    
      this.loadkeywords=this.loadkeywords.bind(this);
      this.occupationOnChangeHandler=this.occupationOnChangeHandler.bind(this);
      this.go=this.go.bind(this);
     
     

};
  
  
  
async componentWillMount(){
    var items=[{item:'fetching..'}]
    this.setState({keywords:items});
      await this.loadkeywords()
      
}

async loadkeywords(){
    firebase.firestore().collection('occupations').get().then((snapshot=>{
      let array=[];
      snapshot.docs.forEach((doc=>{
          var Item={
              key:doc.data().key,
              item:doc.data().item
          }
          array.push(Item)
          
      }))

      this.setState({
          keywords:array
      })
 


        })).catch((err)=>{
            console.log("error : "+err)
        })
}

occupationOnChangeHandler(event){
    this.setState({occupation: event.target.value});
    console.log(this.state.occupation)
}


go(){
    console.log(this.state.occupation)
    firebase.firestore().collection('serviceProviders').where('occupation','==',this.state.occupation).get().then((snapshot=>{
        console.log("exce")
        snapshot.docs.forEach((doc=>{
            console.log("exce1")
            console.log("name:"+doc.data().name)
            //code to show service providers

            

        }))
  
        
   
  
  
          })).catch((err)=>{
              console.log("error : "+err)
          })

}



  
render(){
             
      return (
      <div>
             <form>
             <input list="occupation" onChange={this.occupationOnChangeHandler} />
                    <datalist id="occupation" >
                        {this.state.keywords.map((t) =>
                        <option key={t.key}  value={t.item} />
                        )}
                    </datalist>
            </form>
            <a href="#" onClick={this.go} >Submit</a>
            


      </div>
            );
  
}
   
}
  
  export default Explore;