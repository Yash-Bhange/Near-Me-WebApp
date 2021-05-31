import React from "react";
import "../components_css/Preview.css";
import { Link } from "react-router-dom";

export const Preview = ({ review }) => {
  

  return (
    <div>

   
    <div key={review.userId} className="prodviderCardReview">
      <p className="title">{review.title}</p>
      <p className="title">{review.desc}</p>
      <p className="title">
        <i class="fas fa-dollar-sign"> </i> {review.amount}
      </p>
      <p className="title">{review.stars}/5</p>
      <p>
        
        <b>REVIEW</b><br></br>
        <p>{review.review}</p>
      </p>
      <p>User : {review.userID}</p>

      
    </div>
    <br></br>

    </div>
  );
};
