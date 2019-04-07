import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';
import styled from 'styled-components';
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
    fetch('/morehomes')
      .then(response => response.json()).then((twelveHomes) => {
        this.setState({ moreHomes: twelveHomes });
      });
  }

  render() {
    const Carousel = styled.div`
    margin: 50px 125px;
    `;
    const Title = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans');
    font-family: Roboto, sans-serif;
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
