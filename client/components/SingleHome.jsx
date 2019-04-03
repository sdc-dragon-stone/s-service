import React from 'react';

function SingleHome(props) {
  return (
    <div className="homePic">
      <img src={props.pictureUrl} key={props.id} alt="Place for rent" width="350" height="225" />
      <div> {props.typeOfHome} &#183; {props.city}</div>
      <div>{props.description}</div>
      <div>${props.price} per night</div>
      <div> {props.rating} | {props.reviews} reviews</div>
    </div>
  );
}

export default SingleHome;
