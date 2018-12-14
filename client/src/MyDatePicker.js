import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class MyDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null,
    };
  }
  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day,
    });
    if(this.state.selectedDay !== null)
      console.log(this.state.selectedDay.toLocaleDateString())
  }
  render() {
    return (
      <div>
        <p>
          {this.state.selectedDay
            ? this.state.selectedDay.toLocaleDateString()
            : 'Please select a day'}
        </p>
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
        />
        
      </div>
    );
  }
}

// import React from "react";
// import DatePicker from "react-datepicker";
 
// import "react-datepicker/dist/react-datepicker.css";
 
// // CSS Modules, react-datepicker-cssmodules.css
// // import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
// class MyDatePicker extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       startDate: new Date()
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }
 
//   handleChange(date) {
//     this.setState({
//       startDate: date
//     });
//   }
 
//   render() {
//     return (
//       <DatePicker
//         selected={this.state.startDate}
//         onChange={this.handleChange}
//       />
//     );
//   }
// }

// export default MyDatePicker