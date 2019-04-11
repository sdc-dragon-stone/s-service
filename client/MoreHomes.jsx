import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';
import styled from 'styled-components';
import $ from 'jquery';
import SingleHome from './components/SingleHome.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class MoreHomes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreHomes: []
    };
  }

  componentDidMount() {
    function getRandomId(min, max) {
      const minId = Math.ceil(min);
      const maxId = Math.floor(max);
      return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    }
    let id;
    if (window.id === null || window.id === undefined || window.id > 100) {
      id = getRandomId(1, 100);
    } else {
      id = window.id;
    }
    $.ajax({
      method: 'GET',
      url: '/morehomes',
      dataType: 'json',
      data: { id: id },
      success: (twelveHomes) => {
        console.log('TWELVE HOMES', twelveHomes);
        this.setState({ moreHomes: twelveHomes });
      }
    });
  }

  render() {
    const Carousel = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans');
    font-family: Roboto, sans-serif;
    margin: 50px 125px;
    align: center;
    `;
    const Title = styled.div`
    font-weight: 500;
    font-size: 23px;
    color: #4A4745;
    `;
    const settings = {
      dots: true,
      arrows: true,
      lazyLoad: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      className: 'slides'
    };
    return (
      <Carousel>
        <Title>
          More homes you may like <br /><br />
        </Title>
        <div>
          <Slider {...settings} style={{ color: 'black' }}>
            {this.state.moreHomes.map(eachHome => (
              <SingleHome
                key={eachHome._id + eachHome.city}
                id={eachHome._id}
                pictureUrl={eachHome.pictureUrl}
                typeOfHome={eachHome.typeOfHome}
                city={eachHome.city}
                description={eachHome.description}
                price={eachHome.price}
                rating={eachHome.rating}
                reviews={eachHome.reviews}
              />
            ))}
          </Slider>
        </div>
      </Carousel>
    );
  }
}

ReactDOM.render(<MoreHomes />, document.getElementById('morehomes'));
