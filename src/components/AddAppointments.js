import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const AddAppointments = (props) => {
  const [state, setState] = useState({
    petName: "",
    ownerName: "",
    aptDate: "",
    aptTime: "",
    aptNotes: "",
  });

  const handleAdd = (e) => {
    e.preventDefault();

    let aptDateToLog;

    if (!state.aptDate && !state.aptTime) {
      aptDateToLog = new Date().toISOString().slice(0, 10) + " 14:00";
    } else if (state.aptDate && !state.aptTime) {
      // aptDateToLog = new Date(aptDate);
      aptDateToLog = state.aptDate + " 14:00";
    } else if (state.aptDate && state.aptTime) {
      aptDateToLog = state.aptDate + " " + state.aptTime;
    } else if (!state.aptDate && state.aptTime) {
      aptDateToLog =
        new Date().toISOString().slice(0, 10) + " " + state.aptTime;
    }
    let tempApt = {
      petName: state.petName,
      ownerName: state.ownerName,
      aptDate: aptDateToLog,
      aptNotes: state.aptNotes,
    };
    props.addAppointment(tempApt);

    setState({
      petName: "",
      ownerName: "",
      aptDate: "",
      aptTime: "",
      aptNotes: "",
    });
    props.toggleForm();
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setState((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  let plusSign = <FaPlus />;
  let minusSign = <FaMinus />;
  let tabSign = props.formDisplay ? minusSign : plusSign;

  return (
    <div
      className={
        "card textcenter mt-3 " + (props.formDisplay ? "" : "add-appointment")
      }
    >
      <div
        className="apt-addheading card-header bg-primary text-white"
        onClick={props.toggleForm}
      >
        {tabSign} Add Appointment
      </div>
      <div className="card-body">
        <form id="aptForm" noValidate onSubmit={handleAdd}>
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
                value={state.petName}
                onChange={handleChange}
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
                value={state.ownerName}
                onChange={handleChange}
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
                value={state.aptDate}
                onChange={handleChange}
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
                value={state.aptTime}
                onChange={handleChange}
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
                value={state.aptNotes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group form-row mb-0">
            <div className="offset-md-2 col-md-10">
              <button type="submit" className="btn btn-primary d-block ml-auto">
                Add Appointment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointments;
