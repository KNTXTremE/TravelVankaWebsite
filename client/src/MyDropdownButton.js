import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

const stations = ["Victory Monument-Rangsit", "Rangsit-Mochit", "Paakred-Mochit", "Meenburi-Rangsit"];

class MyDropdownButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      station: "Select station"
    };
  }


  handleSelect(selectedStation) {
    //alert(`selected=${selectedStation}`);
    this.setState({
      station: stations[selectedStation]
    });
  }

  render() {
    return (
        <DropdownButton
        onSelect={this.handleSelect}
        title={this.state.station}
        id="category-dropdown"
      >
        <MenuItem eventKey="0">{stations.map(station => <div> {station} </div>)[0]}</MenuItem>
        <MenuItem eventKey="1">{stations.map(station => <div> {station} </div>)[1]}</MenuItem>
        <MenuItem eventKey="2">{stations.map(station => <div> {station} </div>)[2]}</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="3">{stations.map(station => <div> {station} </div>)[3]}</MenuItem>
      </DropdownButton>
    );
  }

  
}



export default MyDropdownButton