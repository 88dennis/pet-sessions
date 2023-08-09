import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';

class AddAppointments extends Component {
  constructor() {
    super();
    this.state = {
      petName: '',
      ownerName: '',
      aptDate: '',
      aptTime: '',
      aptNotes: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    console.log(new Date(this.state.aptDate).getTime())
    console.log(Date.now())
    console.log(new Date().toISOString().slice(0, 10))
    console.log(new Date())
    console.log(new Date().toDateString())

let hms = this.state.aptTime;
const [hours, minutes] = hms.split(':');
const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60;
const totalMilSec = totalSeconds*1000;
console.log("milSec", totalMilSec);



    let aptDateToLog;

    if(!this.state.aptDate && !this.state.aptTime){
      aptDateToLog = new Date().toISOString().slice(0, 10) + " 14:00";
    } else if(this.state.aptDate && !this.state.aptTime) {
      // aptDateToLog = new Date(this.state.aptDate);
      aptDateToLog = this.state.aptDate + " 14:00";
    } else if(this.state.aptDate && this.state.aptTime){
      aptDateToLog = this.state.aptDate + " " + this.state.aptTime;
      console.log("*******", this.state.aptDate + " " + this.state.aptTime)
    } else if(!this.state.aptDate && this.state.aptTime){
      aptDateToLog = new Date().toISOString().slice(0, 10) + " " + this.state.aptTime
    }
    let tempApt = {
      petName: this.state.petName,
      ownerName: this.state.ownerName,
      // aptDate: this.state.aptDate ? new Date(this.state.aptDate).getTime() : new Date().toDateString() + ' ' + this.state.aptTime,
      aptDate:aptDateToLog,
      aptNotes: this.state.aptNotes
    };
    this.props.addAppointment(tempApt);
    
    this.setState({
      petName: '',
      ownerName: '',
      aptDate: '',
      aptTime: '',
      aptNotes: ''
    });
    this.props.toggleForm();
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    let plusSign = <FaPlus /> 
    let minusSign = <FaMinus /> 
    let tabSign = this.props.formDisplay ? minusSign : plusSign;
    return (
      <div
        className={
          'card textcenter mt-3 ' +
          (this.props.formDisplay ? '' : 'add-appointment')
        }
      >
        <div
          className="apt-addheading card-header bg-primary text-white"
          onClick={this.props.toggleForm}
        >
            {tabSign} Add Appointment
         {/* {this.props.formDisplay ? <FaMinus /> : <FaPlus />} Add Appointment */}
        </div>
        <div className="card-body">
          <form id="aptForm" noValidate onSubmit={this.handleAdd}>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="petName"
                readOnly
              >
                Pet Name
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="petName"
                  placeholder="Pet's Name"
                  value={this.state.petName}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="ownerName"
              >
                Pet Owner
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="ownerName"
                  placeholder="Owner's Name"
                  value={this.state.ownerName}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptDate"
              >
                Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="aptDate"
                  id="aptDate"
                  value={this.state.aptDate}
                  onChange={this.handleChange}
                />
              </div>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptTime"
              >
                Time
              </label>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  name="aptTime"
                  id="aptTime"
                  value={this.state.aptTime}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                Apt. Notes
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="aptNotes"
                  id="aptNotes"
                  placeholder="Appointment Notes"
                  value={this.state.aptNotes}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Add Appointment
                </button>
              </div>
              
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddAppointments;
