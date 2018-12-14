import React from 'react';
import { Button } from 'react-bootstrap';

class MyButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      count: 0
    };
  }

  handleClick() {
    const { count } = this.state
    //alert(`CLICK!`);
    console.log('Click happened');
    this.setState({
      count: count + 1
    });
  }

  render() {
    const { count } = this.state

    return (
        <Button bsStyle="primary" onClick={this.handleClick}>Confirm Reservation {count}</Button>
    );
  }
}


export default MyButton