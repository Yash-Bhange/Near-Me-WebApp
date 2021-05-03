import React ,{Component} from 'react';
import '../components_css/login.css'
import firebase from '../helper/firebase'



class Review extends Component{  

constructor(props){
      super(props);
      this.state = {title:'',desc: '',amount:'',review:'',star:''};
      this.submitHandler = this.submitHandler.bind(this);
      this.descOnChangeHandler = this.descOnChangeHandler.bind(this);
      this.amountOnChangeHandler = this.amountOnChangeHandler.bind(this);
      this.titleOnChangeHandler = this.titleOnChangeHandler.bind(this);
      this.reviewOnChangeHandler = this.reviewOnChangeHandler.bind(this);
      this.starOnChangeHandler = this.starOnChangeHandler.bind(this);

};
  
  
  
async componentWillMount(){
      //await this.loadWeb3()
      
}
//update name
titleOnChangeHandler(event){
    this.setState({title: event.target.value});
}

//upadtes email
descOnChangeHandler(event){
    this.setState({desc: event.target.value});
}
//updates password
amountOnChangeHandler(event){
    this.setState({amount: event.target.value});
}

reviewOnChangeHandler(event){
    this.setState({review: event.target.value});
}

starOnChangeHandler(event){
    this.setState({star: event.target.value});
}
//manages registration and firestore 
submitHandler(event){


     //succcessfull registration
    firebase.firestore().collection('reviews').add({
    title: this.state.title,
    desc :this.state.desc,
    amount:this.state.amount,
    review: this.state.review,
    stars:this.state.star,
    userID:"user id",
    serviceProviderID :"spID"
    }).then((result)=>{
    console.log("result : "+result)
    }).catch((err)=>{
        console.log("error : "+err)
    })



}


  
render(){
             
      return (
      <div>
             <form>
                <h3>Reviews</h3>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={this.state.title} className="form-control" placeholder="Enter title" onChange={this.titleOnChangeHandler} />
                </div>
                <div className="form-group">
                    <label>desc</label>
                    <input type="text" value={this.state.desc} className="form-control" placeholder="Enter description" onChange={this.descOnChangeHandler} />
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input type="text" value={this.state.amount} className="form-control" placeholder="Enter amount in rupees" onChange={this.amountOnChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Reviews</label>
                    <input type="text" value={this.state.review} className="form-control" placeholder="Enter reviews" onChange={this.reviewOnChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Stars</label>
                    <input type="number" value={this.state.star} className="form-control" placeholder="Enter star (0-5)" min="0" max="5" onChange={this.starOnChangeHandler} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <a  className="btn btn-primary btn-block" onClick={this.submitHandler} >Submit</a>
               
            </form>
      </div>
            );
  
}
   
}
  
  export default Review;