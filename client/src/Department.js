import React, { Component } from 'react';
import 'react-day-picker/lib/style.css'
import { Table, FormGroup, ControlLabel, FormControl, Button, Tab, Tabs } from 'react-bootstrap'
import './App.css';
import MyNavBar from './MyNavBar';


class Department extends Component {

    constructor(props, context) {
        super(props, context);
        this.handle_add_dept_dname = this.handle_add_dept_dname.bind(this);
        this.handle_add_dept_tel = this.handle_add_dept_tel.bind(this);
        this.handle_change_dept_tel_dname = this.handle_change_dept_tel_dname.bind(this);
        this.handle_change_dept_tel_tel = this.handle_change_dept_tel_tel.bind(this);
        this.handle_delete_dept_dname = this.handle_delete_dept_dname.bind(this);
        this.fetchDeptTable = this.fetchDeptTable.bind(this);

        this.state = {
            add_dept_dnameTB: '',
            add_dept_telTB: '',
            change_dept_tel_dnameTB: '',
            change_dept_tel_telTB: '',
            remove_dept_dnameTB: '',
            deptTable: [],
            cansend: false
        }
    }


    componentDidMount() {
        this.fetchDeptTable();
    }

    async fetchDeptTable() {
        try {
            // this.setState({
            //     deptTable: []
            // })
            const response = await fetch('/dplop/list_dept')
            const results = await response.json();
            console.log(results)
            this.setState({
                deptTable: results
            })

        } catch (error) {
            console.log('Department table parsing failed', error);
        }
    }

    getValidationState(txt) {
        const length = txt.length;
        if ((txt === this.state.change_dept_tel_telTB || txt === this.state.add_dept_telTB) && length > 0) {
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

    handle_add_dept_dname(e) {
        this.setState({ add_dept_dnameTB: e.target.value });
    }

    handle_add_dept_tel(e) {
        this.setState({ add_dept_telTB: e.target.value });
    }

    handle_change_dept_tel_dname(e) {
        this.setState({ change_dept_tel_dnameTB: e.target.value });
    }

    handle_change_dept_tel_tel(e) {
        this.setState({ change_dept_tel_telTB: e.target.value });
    }

    handle_delete_dept_dname(e) {
        this.setState({ remove_dept_dnameTB: e.target.value });
    }

    addDeptName = e => {
        e.preventDefault()
        if (this.state.cansend === false)
            alert(`PLEASE TYPE NUMBER, NOT CHARACTER!`);
        else if (this.state.add_dept_dnameTB !== '' && this.state.add_dept_telTB !== '') {
            const data = { deptName: this.state.add_dept_dnameTB, telno: this.state.add_dept_telTB }
            fetch('/dplop/add_dept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            })
            this.setState({
                add_dept_dnameTB: '',
                add_dept_telTB: ''
            })
            //this.props.history.push('/');
        }
        else {
            alert(`PLEASE FILL IN BEFORE PRESS THE BUTTON!`);
        }
    }

    changeDeptTel = e => {
        e.preventDefault()
        if (this.state.cansend === false)
            alert(`PLEASE TYPE NUMBER, NOT CHARACTER!`);
        else if (this.state.change_dept_tel_dnameTB !== '' && this.state.change_dept_tel_telTB !== '') {
            const data = { deptName: this.state.change_dept_tel_dnameTB, telno: this.state.change_dept_tel_telTB }
            // console.log(JSON.stringify(data))
            const response = fetch('/dplop/change_dept_tel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            this.setState({
                change_dept_tel_dnameTB: '',
                change_dept_tel_telTB: ''
            })
            //this.props.history.push('/');
        }
        else {
            alert(`PLEASE FILL IN BEFORE PRESS THE BUTTON!`);
        }
    }

    deleteDept = e => {
        e.preventDefault()
        if (this.state.remove_dept_dnameTB !== '') {
            fetch('/dplop/remove_dept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ deptName: this.state.remove_dept_dnameTB })

            })
            this.setState({
                remove_dept_dnameTB: ''
            })
            //this.props.history.push('/');
        }
        else {
            alert(`PLEASE FILL IN BEFORE PRESS THE BUTTON!`);
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <MyNavBar></MyNavBar>
                    <header className="App-containers">

                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Add Department">
                                {/* ADD DEPT */}
                                <form>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState(this.state.add_dept_dnameTB)}
                                    >
                                        <ControlLabel>Add department</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.add_dept_dnameTB}
                                            placeholder="Department name"
                                            onChange={this.handle_add_dept_dname}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState(this.state.add_dept_telTB)}
                                    >
                                        <FormControl
                                            type="text"
                                            value={this.state.add_dept_telTB}
                                            placeholder="Telephone No."
                                            onChange={this.handle_add_dept_tel}
                                        />
                                        <FormControl.Feedback />
                                        <Button bsStyle="primary" onClick={this.addDeptName}>Add</Button>
                                    </FormGroup>
                                </form>
                            </Tab>
                            <Tab eventKey={2} title="Change Department TelNo.">
                                {/* CHANGE DEPT TELNO */}
                                <form>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState(this.state.change_dept_tel_dnameTB)}
                                    >
                                        <ControlLabel>Change Telephone No.</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.change_dept_tel_dnameTB}
                                            placeholder="Department name"
                                            onChange={this.handle_change_dept_tel_dname}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState(this.state.change_dept_tel_telTB)}
                                    >
                                        <FormControl
                                            type="text"
                                            value={this.state.change_dept_tel_telTB}
                                            placeholder="New Telephone No."
                                            onChange={this.handle_change_dept_tel_tel}
                                        />
                                        <FormControl.Feedback />
                                        <Button bsStyle="warning" onClick={this.changeDeptTel}>Change</Button>
                                    </FormGroup>
                                </form>
                            </Tab>
                            <Tab eventKey={3} title="Delete Department">
                                {/* DELETE DEPT */}
                                <form>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState(this.state.remove_dept_dnameTB)}
                                    >
                                        <ControlLabel>Delete department</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.remove_dept_dnameTB}
                                            placeholder="Department name"
                                            onChange={this.handle_delete_dept_dname}
                                        />
                                        <FormControl.Feedback />
                                        <Button bsStyle="danger" onClick={this.deleteDept}>Delete</Button>
                                    </FormGroup>
                                </form>
                            </Tab>
                        </Tabs>

                        {/* LIST OF DEPT */}
                        {/* <ControlLabel>List of Department</ControlLabel> */}
                        <Button bsStyle="primary" onClick={this.fetchDeptTable}>Fetch Department Table</Button>
                        <Table responsive striped condensed hover>
                            <thead>
                                <tr>
                                    <th>Department name</th>
                                    <th>Telephone No.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.deptTable === null ? null : this.state.deptTable.map(dept => {
                                        const { deptName, telno } = dept;
                                        return <tr><td>{deptName}</td><td>{telno}</td></tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </header>
                </div>
            </React.Fragment >
        );
    }
}



export default Department;
