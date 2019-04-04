import React from 'react';

function SingleHome(props) {
  return (
    <div className="homePic">
      <a href="https://thisrentaldoesnotexist.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <img src={props.pictureUrl} key={props.id} alt="Place for rent" width="315" height="210" />
        <div> {props.typeOfHome} &#183; {props.city}</div>
        <div>{props.description}</div>
        <div>${props.price} per night</div>
        <div> {props.rating} | {props.reviews} reviews</div>
      </a>
    </div>
  );
}

export default SingleHome;
