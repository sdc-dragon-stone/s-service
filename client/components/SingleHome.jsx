/* eslint-disable no-restricted-globals */
import React from 'react';
import styled from 'styled-components';

function SingleHome(props) {
  const GeneralStyle = styled.div`
  color: #4A4745;
  line-height: 20px;
  letter-spacing: 0.2px
  `;
  const HomeType = styled.div`
  color: #744D32;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  `;
  const DescribeHome = styled.div`
  font-weight: 500;
  font-size: 16px;
  `;
  const Price = styled.div`
  font-weight: 300;
  font-size: 13px;
  `;
  const HomeReviews = styled.div`
  font-weight:400;
  font-size: 12px;
  `;
  return (
    <div className="homePic">
      <a href={`${location.origin}?id=${props.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <img src={props.pictureUrl} key={props.id} alt="Place for rent" width="315" height="210" />
        <GeneralStyle>
          <HomeType>{props.typeOfHome} &#183; {props.city}</HomeType>
          <DescribeHome>{props.description}</DescribeHome>
          <Price>${props.price} per night</Price>
          <HomeReviews><img src={props.rating} key={`${props.id}rating`} alt="Rating" width="63" height="15" align="left" style={{ margin: '2px 0px' }} />{props.reviews}</HomeReviews>
        </GeneralStyle>
      </a>
    </div>
  );
}

export default SingleHome;
