import React, { Component } from 'react';
import 'react-day-picker/lib/style.css'
import { Table, FormGroup, ControlLabel, FormControl, Button, Tabs, Tab } from 'react-bootstrap'
import DayPicker from 'react-day-picker';
import './App.css';
import MyNavBar from './MyNavBar';


class Trip extends Component {

    constructor(props, context) {
        super(props, context);
        this.handle_update_trip_TripNo = this.handle_update_trip_TripNo.bind(this);
        this.handle_update_trip_deptTime = this.handle_update_trip_deptTime.bind(this);
        this.handle_update_trip_arrvTime = this.handle_update_trip_arrvTime.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handle_list_trip_routeID = this.handle_list_trip_routeID.bind(this);
        this.fetchTripTable = this.fetchTripTable.bind(this);
        this.state = {
            update_trip_tripNoTB: '',
            update_trip_deptTimeTB: '',
            update_trip_arrvTimeTB: '',
            list_trip_dateTB: null,
            list_trip_routeIDTB: '',
            tripTable: [],
            cansend: true
        }
    }


    // componentDidMount() {
    //     this.fetchTripTable();
    // }

    async fetchTripTable() {
        // e.preventDefault()
        // if (this.state.cansend === false)
        //     alert(`ERROR!`);
        if (this.state.list_trip_dateTB !== null) {
            try {

                const data = { date: this.state.list_trip_dateTB }
                console.log(JSON.stringify(data))
                const response = await fetch('/dplop/list_trip', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)

                })
                // this.setState({
                //     tripTable: []
                // })
                // const response = await fetch('/dplop/list_trip')
                const results = await response.json();
                await this.setState({ tripTable: results });
                this.setState({
                    list_trip_dateTB: ''
                })
            } catch (error) {
                console.log('Trip table parsing failed', error);
            }


            // this.fetchTripTable()
        }
        // else {
        //     alert(`PLEASE FILL IN BEFORE PRESS THE BUTTON!`);
        // }

    }

    getValidationState(txt) {
        // const length = txt.length;
        // if ((txt === this.state.change_dept_tel_telTB || txt === this.state.add_dept_telTB) && length > 0) {
        //     if (isNaN(parseInt(txt))) {
        //         this.state.cansend = false
        //         return 'error'
        //     }
        //     else{
        //         this.state.cansend = true
        //     }

        // }
        // // if (length > 3) return 'success';
        // // else if (length > 0) return 'error';
        // return null;
    }

    handle_update_trip_TripNo(e) {
        this.setState({ update_trip_tripNoTB: e.target.value });
    }

    handle_update_trip_deptTime(e) {
        this.setState({ update_trip_deptTimeTB: e.target.value });
    }

    handle_update_trip_arrvTime(e) {
        this.setState({ update_trip_arrvTimeTB: e.target.value });
    }

    handleDayClick(day, { selected }) {
        const month = day.getMonth()+1
        this.setState({
            list_trip_dateTB: selected ? undefined : day.getFullYear()+"-"+ month +"-"+day.getDate()
        });
        // if (this.state.list_trip_dateTB !== null)
            // console.log(this.state.list_trip_dateTB)
    }

    handle_list_trip_routeID(e) {
        this.setState({ list_trip_routeIDTB: e.target.value });
    }


    updateTrip = e => {
        e.preventDefault()
        if (this.state.cansend === false)
            alert(`ERROR!`);
        else if (this.state.update_trip_tripNoTB !== '' && this.state.update_trip_deptTimeTB !== '' && this.state.update_trip_arrvTimeTB !== '') {
            const data = { tripNo: this.state.update_trip_tripNoTB, deptTime: this.state.update_trip_deptTimeTB, arrvTime: this.state.update_trip_arrvTimeTB }
            console.log(JSON.stringify(data))
            fetch('/dplop/update_trip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                //this.props.history.push('/');
            })
            this.setState({
                update_trip_tripNoTB: '',
                update_trip_deptTimeTB: '',
                update_trip_arrvTimeTB: ''
            })
        }
        else {
            alert(`PLEASE FILL IN BEFORE PRESS THE BUTTON!`);
        }
    }

    // listTrip = e => {

    // }


    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <MyNavBar></MyNavBar>
                    <header className="App-containers">

                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Update Trip">
                                {/* UPDATE TRIP */}
                                <form>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState(this.state.update_trip_tripNoTB)}
                                    >
                                        <ControlLabel>Update Trip</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.update_trip_tripNoTB}
                                            placeholder="TripNo"
                                            onChange={this.handle_update_trip_TripNo}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState(this.state.update_trip_deptTimeTB)}
                                    >
                                        <FormControl
                                            type="text"
                                            value={this.state.update_trip_deptTimeTB}
                                            placeholder="Departure time"
                                            onChange={this.handle_update_trip_deptTime}
                                        />
                                        <FormControl.Feedback />
                                        {/* <HelpBlock></HelpBlock> */}
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState(this.state.update_trip_arrvTimeTB)}
                                    >
                                        <FormControl
                                            type="text"
                                            value={this.state.update_trip_arrvTimeTB}
                                            placeholder="Arrival time"
                                            onChange={this.handle_update_trip_arrvTime}
                                        />
                                        <FormControl.Feedback />
                                        {/* <HelpBlock></HelpBlock> */}
                                        <Button bsStyle="warning" onClick={this.updateTrip}>Update</Button>
                                    </FormGroup>
                                </form>
                            </Tab>
                            <Tab eventKey={2} title="List of Trip">
                                {/* LIST OF TRIP */}
                                <ControlLabel>List of Trip</ControlLabel>
                                <div>
                                    <p>
                                        {this.state.list_trip_dateTB
                                            ? this.state.list_trip_dateTB
                                            : 'Please select a day'}
                                    </p>
                                    <DayPicker
                                        list_trip_dateTB={this.state.list_trip_dateTB}
                                        onDayClick={this.handleDayClick}
                                    />
                                </div>

                                {/* <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.getValidationState(this.state.list_trip_routeIDTB)}
                                >
                                    <FormControl
                                        type="text"
                                        value={this.state.list_trip_routeIDTB}
                                        placeholder="RouteID"
                                        onChange={this.handle_list_trip_routeID}
                                    />
                                    <FormControl.Feedback /> */}
                                <Button bsStyle="primary" onClick={this.fetchTripTable}>List available trip</Button>
                                {/* </FormGroup> */}
                                <Table responsive striped condensed hover>
                                    <thead>
                                        <tr>
                                            <th>TripNo</th>
                                            <th>Departure Station</th>
                                            <th>Arrival Station</th>
                                            <th>Departure Time</th>
                                            <th>Arrival Time</th>
                                            <th>Available Seats</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.tripTable === null ? null : this.state.tripTable.map(trip => {
                                                const { tripNo, deptStation, arrvStation, deptTime, arrvTime, availSeat } = trip;
                                                return <tr><td>{tripNo}</td><td>{deptStation}</td><td>{arrvStation}</td><td>{deptTime}</td><td>{arrvTime}</td><td>{availSeat}</td></tr>

                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Tab>
                        </Tabs>


                    </header>
                </div>
            </React.Fragment>
        );
    }
}



export default Trip;
