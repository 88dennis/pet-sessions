import React, { Component } from 'react';
import {FaTimes} from 'react-icons/fa';
import Moment from 'react-moment';

class ListAppointments extends Component {
  
  convertDate(timestamp){
    // const timestamp = 1616608200000; // example timestamp
const date = new Date(timestamp);
// console.log(date.getFullYear()); // prints the year (e.g. 2021)
// console.log(date.getMonth()); // prints the month (0-11, where 0 = January)
// console.log(date.getDate()); // prints the day of the month (1-31)
// console.log(date.getHours()); // prints the hour (0-23)
// console.log(date.getMinutes()); // prints the minute (0-59)
// console.log(date.getSeconds()); // prints the second (0-59)

return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ", "+ date.toDateString();

// return date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();

  }
    render() {
      
        return (
          <div className="appointment-list item-list mb-3">
            {this.props.appointments.map((item, index) => (
              <div className="pet-item col media py-3" key={item.aptId}>
                <div className="mr-3">
                  <button
                    className="pet-delete btn btn-sm btn-danger"
                    onClick={() => this.props.deleteAppointment(item.aptId)}
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
                      onBlur={e =>
                        this.props.updateInfo(
                          'petName',
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
                      {/* {new Date(item.aptDate).getTime()} */}
                      {this.convertDate(new Date(item.aptDate).getTime())}
                    </span>
                  </div>
    
                  <div className="owner-name">
                   {this.props.petNameRecord ==="" ? <button onClick={()=>this.props.showRecord(item.petName)}><span className="label-item">Show all records of {item.petName}  </span></button> : "" } 
                  </div>
                  <div className="owner-name">
                    <span className="label-item">Owner: </span>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={e =>
                        this.props.updateInfo(
                          'ownerName',
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
                    onBlur={e =>
                      this.props.updateInfo(
                        'aptNotes',
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
      }
}

export default ListAppointments
