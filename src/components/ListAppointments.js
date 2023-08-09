import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Moment from "react-moment";

const ListAppointments = (props) => {
  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }) +
      ", " +
      date.toDateString()
    );
  };
  return (
    <div className="appointment-list item-list mb-3">
      {props.appointments.map((item, index) => (
        <div className="pet-item col media py-3" key={item.aptId}>
          <div className="mr-3">
            <button
              className="pet-delete btn btn-sm btn-danger"
              onClick={() => props.deleteAppointment(item.aptId)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="pet-info media-body">
            <div className="pet-head d-flex">
              <span
                className="pet-name"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  props.updateInfo(
                    "petName",
                    e.target.innerText,
                    item.aptId
                  )
                }
              >
                {/* {item.aptId}-- */}
                {item.petName}
              </span>
              <span className="apt-date ml-auto">
                {/* <Moment
                        date={item.aptDate}
                        parse="YYYY-MM-dd hh:mm"
                        format="MMM-d h:mma"
                      /> */}
                {convertDate(new Date(item.aptDate).getTime())}
              </span>
            </div>
            <div className="owner-name">
              {props.petNameRecord === "" ? (
                <button onClick={() => props.showRecord(item.petName)}>
                  <span className="label-item">
                    Show all records of {item.petName}{" "}
                  </span>
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="owner-name">
              <span className="label-item">Owner: </span>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  props.updateInfo(
                    "ownerName",
                    e.target.innerText,
                    item.aptId
                  )
                }
              >
                {item.ownerName}
              </span>
            </div>
            <div
              className="apt-notes"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                props.updateInfo(
                  "aptNotes",
                  e.target.innerText,
                  item.aptId
                )
              }
            >
              {item.aptNotes}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListAppointments;

