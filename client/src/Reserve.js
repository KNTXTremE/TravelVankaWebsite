import React, { Component } from 'react';
import 'react-day-picker/lib/style.css'
import { Table, FormGroup, ControlLabel, FormControl, Button, Tab, Tabs } from 'react-bootstrap'
import './App.css';
import MyNavBar from './MyNavBar';


class Reserve extends Component {

    constructor(props, context) {
        super(props, context);
        this.handle_insert_reservation_cusID = this.handle_insert_reservation_cusID.bind(this);
        this.handle_insert_reservation_tripNo = this.handle_insert_reservation_tripNo.bind(this);
        this.handle_cancel_reservation_RSVCode = this.handle_cancel_reservation_RSVCode.bind(this);
        this.handle_list_reservation_cusID = this.handle_list_reservation_cusID.bind(this);
        this.fetchReservTable = this.fetchReservTable.bind(this);

        this.state = {
            contacts: [],
            insert_reservation_cusIDTB: '',
            insert_reservation_tripNoTB: '',
            cancel_reservation_RSVCodeTB: '',
            list_reservation_cusIDTB: '',
            cansend: false
        }
    }

    componentDidMount() {
        this.fetchReservTable();
    }

    async fetchReservTable() {

        // if (this.state.cansend === false && this.state.list_reservation_cusIDTB !== '')
        //     alert(`PLEASE TYPE NUMBER, NOT CHARACTER!`);
        if (this.state.list_reservation_cusIDTB !== '') {
            // e.preventDefault()
            const response = await fetch('/dplop/list_reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ customerID: this.state.list_reservation_cusIDTB })

            })
            try {
                // this.setState({
                //     contacts: []
                // })
                // const response = await fetch('https://raw.githubusercontent.com/KNTXTremE/TravelVankaWebsite/master/src/raw/rawfile')
                const results = await response.json();
                await this.setState({ contacts: results });
                //console.log(this.state.results)
                this.setState({
                    list_reservation_cusIDTB: ''
                })
            } catch (error) {
                console.log('Reservation table parsing failed', error);
            }
            // this.props.history.push('/');
        }
        else {
            // alert(`PLEASE FILL IN BEFORE PRESS THE BUTTON!`);
        }

    }

    getValidationState(txt) {
        const length = txt.length;
        if ((txt === this.state.insert_reservation_cusIDTB || txt === this.state.insert_reservation_tripNoTB || txt === this.state.insert_reservation_seatsNo || txt === this.state.cancel_reservation_RSVCodeTB || txt === this.state.list_reservation_cusIDTB) && length > 0) {
            if (isNaN(parseInt(txt))) {
                this.state.cansend = false
                return 'error'
            }
            else {
                this.state.cansend = true
            }

        }
        // if (length > 3) return 'success';
        // else if (length > 0) return 'error';
        return null;
    }

    handle_insert_reservation_cusID(e) {
        this.setState({ insert_reservation_cusIDTB: e.target.value });
    }

    handle_insert_reservation_tripNo(e) {
        this.setState({ insert_reservation_tripNoTB: e.target.value });
    }

    handle_cancel_reservation_RSVCode(e) {
        this.setState({ cancel_reservation_RSVCodeTB: e.target.value });
    }

    handle_list_reservation_cusID(e) {
        this.setState({ list_reservation_cusIDTB: e.target.value });
    }

    insertReserve = e => {
        e.preventDefault()
        if (this.state.cansend === false)
            alert(`PLEASE TYPE NUMBER, NOT CHARACTER!`);
        else if (this.state.insert_reservation_cusIDTB !== '' && this.state.insert_reservation_tripNoTB !== '') {
            const data = { tripNo: this.state.insert_reservation_tripNoTB, customerID: this.state.insert_reservation_cusIDTB }
            console.log(JSON.stringify(data))
            fetch('/dplop/insert_reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                //this.props.history.push('/');
                
            })
            this.setState({
                insert_reservation_cusIDTB: '' ,
                insert_reservation_tripNoTB: ''
            })
        }
        else {
            alert(`PLEASE FILL IN BEFORE PRESS THE BUTTON!`);
        }
    }

    cancelReserve = e => {
        e.preventDefault()
        if (this.state.cansend === false)
            alert(`PLEASE TYPE NUMBER, NOT CHARACTER!`);
        else if (this.state.cancel_reservation_RSVCodeTB !== '') {
            fetch('/dplop/cancel_reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reservationCode: this.state.cancel_reservation_RSVCodeTB })

            })
            // this.props.history.push('/');
            this.setState({
                cancel_reservation_RSVCodeTB: ''
            })
        }
        else {
            alert(`PLEASE FILL IN BEFORE PRESS THE BUTTON!`);
        }
    }

    // listReserve = e => {

    // }

    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <MyNavBar></MyNavBar>
                    <header className="App-containers">

                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Insert Reservation">
                                {/* INSERT RESERVATION */}
                                <form>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState(this.state.insert_reservation_cusIDTB)}
                                    >
                                        <ControlLabel>Insert Reservation</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.insert_reservation_cusIDTB}
                                            placeholder="CustomerID"
                                            onChange={this.handle_insert_reservation_cusID}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState(this.state.insert_reservation_tripNoTB)}
                                    >
                                        <FormControl
                                            type="text"
                                            value={this.state.insert_reservation_tripNoTB}
                                            placeholder="Trip No"
                                            onChange={this.handle_insert_reservation_tripNo}
                                        />
                                        <FormControl.Feedback />
                                        <Button bsStyle="primary" onClick={this.insertReserve}>Insert</Button>
                                    </FormGroup>
                                </form>
                            </Tab>
                            <Tab eventKey={2} title="Cancel Reservation">
                                {/* CANCEL RESERVATION */}
                                <form>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState(this.state.cancel_reservation_RSVCodeTB)}
                                    >
                                        <ControlLabel>Cancel Reservation</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.cancel_reservation_RSVCodeTB}
                                            placeholder="RSV Code"
                                            onChange={this.handle_cancel_reservation_RSVCode}
                                        />
                                        <FormControl.Feedback />
                                        <Button bsStyle="danger" onClick={this.cancelReserve}>Cancel</Button>
                                    </FormGroup>
                                </form>
                            </Tab>
                        </Tabs>

                        {/* LIST OF RESERVATION */}
                        <ControlLabel>List of Reservation</ControlLabel>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.getValidationState(this.state.list_reservation_cusIDTB)}
                        >
                            <FormControl
                                type="text"
                                value={this.state.list_reservation_cusIDTB}
                                placeholder="CustomerID"
                                onChange={this.handle_list_reservation_cusID}
                            />
                            <FormControl.Feedback />
                            <Button bsStyle="primary" onClick={this.fetchReservTable}>List reservation of customer {this.state.list_reservation_cusIDTB}</Button>
                        </FormGroup>
                        <Table responsive striped condensed hover>
                            <thead>
                                <tr>
                                    <th>Reservation Code</th>
                                    <th>Reservation Time</th>
                                    <th>Total Fare</th>
                                    <th>Trip No.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.contacts === null ? null : this.state.contacts.map(contact => {
                                        const { reservationCode, reservationTime, totalFare, tripNo } = contact;
                                        return <tr><td>{reservationCode}</td><td>{reservationTime}</td><td>{totalFare}</td><td>{tripNo}</td></tr>
                                    })
                                }
                            </tbody>
                        </Table>

                        {/* <MyDropdownButton></MyDropdownButton>
                            <DayPicker />
                            <MyButton></MyButton> */}

                    </header>
                </div>
            </React.Fragment>
        );
    }
}



export default Reserve;
