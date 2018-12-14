import React from 'react';
import {Carousel} from 'react-bootstrap';

class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    //alert(`selected=${selectedIndex}, direction=${e.direction}`);
    this.setState({
      index: selectedIndex,
      direction: e.direction  
    });
  }

  render() {
    const { index, direction } = this.state;

    return (
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
      >
        <Carousel.Item>
          <img width={500} height={300} alt="900x500" src="https://raw.githubusercontent.com/KNTXTremE/TravelVankaWebsite/master/client/src/picture/travelvanka.png" />
          <Carousel.Caption>
            <h3>Welcome to TravelVanka Website!</h3>
            <p>by D Plop company</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={500} height={300} alt="900x500" src="https://www.lifewire.com/thmb/6dT2TKFV1huAzzTE9ryo9CUw9Xc=/1920x0/filters:no_upscale():max_bytes(150000):strip_icc()/Soft_focus_sweet_flowers_JK059_350A-5919ce705f9b58f4c0412206.jpg" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Test2</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={500} height={300} alt="900x500" src="https://www.lifewire.com/thmb/U7tK2vnzegXnxXKGdQFsMhzOKUo=/1280x0/filters:no_upscale():max_bytes(150000):strip_icc()/vladstudio-library-wallpaper-5919cd763df78cf5fa3d7e27.jpg" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Test3</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}


export default ControlledCarousel
//render(<ControlledCarousel />);