import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';
import SingleHome from './components/SingleHome.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class App extends React.Component {
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
    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0
    };
    return (
      <div>
        <div>
          More homes you may like <br /><br />
        </div>
        <div>
          <Slider {...settings}>
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
