import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
// import {findIndex} from 'lodash';

class  App extends Component {
  constructor(){
    super();

    this.state = {
      myAppointments: [],
      lastIndex: 1,
      orderBy: 'petName',
      orderDir: 'asc',
      formDisplay: false,
      petNameRecord:"",
      queryText:""
    }

    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.showRecord = this.showRecord.bind(this);
    this.viewAll = this.viewAll.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);

  }

  componentDidMount(){
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({lastIndex: this.state.lastIndex + 1})
          return item;
        })
        this.setState({
          myAppointments: apts
        },() => console.log(this.state.myAppointments));
      })


  }

  toggleForm(){
    // const newState = {...this.state};
    // newState.formDisplay = !newState.formDisplay;
    // this.setState(newState);
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  searchApts(query) {
    this.setState({ 
      queryText: query
     });
  } 
  changeOrder(order, dir){
    this.setState({
      orderBy: order,
      orderDir: dir
    })
  }

  showRecord(petname) {
    this.setState({
      petNameRecord: petname.toLowerCase()
    })
  }

  viewAll() {
    this.setState({
      petNameRecord: ""
    })
    
  }

updateInfo(name, value, id) {
  const newState = {...this.state}
  let obj = this.state.myAppointments.find(elem => elem.aptId === id);
  let aptIndex = this.state.myAppointments.indexOf(obj);
  console.log(aptIndex)
  newState.myAppointments[aptIndex][name] = value;
  console.log(obj[name])
  this.setState(newState)
  }

//USING LODASH
//   updateInfo(name, value, id) {
// let tempApts = this.state.myAppointments;
// let aptIndex = findIndex(this.state.myAppointments, {
//   aptId: id
// });

// tempApts[aptIndex][name] = value;
// this.setState({
//   myAppointments: tempApts
// })


//   }
  addAppointment(apt){
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);

    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    })
    console.log(apt.aptId);
    console.log(tempApts);
  }
  //USING LODASH
  // deleteAppointment(apt){
  //   let tempApts = this.state.myAppointments;
  //   tempApts = without(tempApts, apt);
  //   console.log(tempApts)
  //   this.setState({
  //     myAppointments: tempApts
  //   });
  // }

  // USING FILTER AND ID
  deleteAppointment = (id)=>{
// console.log(id)
// alert(id);
    console.log(this.state.myAppointments);
    console.log(id, "ID")
    let updatedApts = this.state.myAppointments.filter(apt => apt.aptId !== id);
    console.log(updatedApts);
    this.setState({
      myAppointments: updatedApts
    });

  }

  render(){

    let order;
    let filteredApts = this.state.myAppointments;
    let viewAllbtn=""

    if(this.state.petNameRecord !=="") {
      filteredApts = filteredApts.filter(item => item.petName.toLowerCase() === this.state.petNameRecord);
      if (this.state.orderDir === 'asc') {
        order = 1;
      } else {
        order = -1;
      }
  
      filteredApts = filteredApts
        .sort((a, b) => {
          if (
            a[this.state.orderBy].toLowerCase() <
            b[this.state.orderBy].toLowerCase()
          ) {
            return -1 * order;
          } else {
            return 1 * order;
          }
        })
        .filter(eachItem => {
          return (
            eachItem['petName']
              .toLowerCase()
              .includes(this.state.queryText.toLowerCase()) ||
            eachItem['ownerName']
              .toLowerCase()
              .includes(this.state.queryText.toLowerCase()) ||
            eachItem['aptNotes']
              .toLowerCase()
              .includes(this.state.queryText.toLowerCase())
          );
        });
      viewAllbtn = <button onClick={()=>this.viewAll()}><span className="label-item">View All Records </span></button>
    } else {

      if (this.state.orderDir === 'asc') {
        order = 1;
      } else {
        order = -1;
      }
  
      filteredApts = filteredApts
        .sort((a, b) => {
          if (
            a[this.state.orderBy].toLowerCase() <
            b[this.state.orderBy].toLowerCase()
          ) {
            return -1 * order;
          } else {
            return 1 * order;
          }
        })
        .filter(eachItem => {
          return (
            eachItem['petName']
              .toLowerCase()
              .includes(this.state.queryText.toLowerCase()) ||
            eachItem['ownerName']
              .toLowerCase()
              .includes(this.state.queryText.toLowerCase()) ||
            eachItem['aptNotes']
              .toLowerCase()
              .includes(this.state.queryText.toLowerCase())
          );
        });
    // filteredApts = this.state.myAppointments;
    }
// function sortList (orderDir, order, filteredAptsArr, orderBy) {
  
//   if(orderDir === "asc") {
//     order = 1;
//   } else {
//     order = -1;
//   }

//   filteredAptsArr.sort((a,b) => {
//     if(a[orderBy].toLowerCase() < b[orderBy].toLowerCase()){
//       return -1 * order
//     } else {
//       return 1 * order
//     }
//   })
// }
   
    // if(this.state.orderDir === "asc") {
    //   order = 1;
    // } else {
    //   order = -1;
    // }
    // newFiltered.sort((a,b) => {
    //   if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()){
    //     return -1 * order
    //   } else {
    //     return 1 * order
    //   }
    // });

    return (
      <main basename={process.env.PUBLIC_URL} className="page bg-white" id="petratings">
          <div className="container">
            <div className="row">
              <div className="col-md-12 bg-white">
                <div className="container">
      <h1>Pet Sessions</h1>
                   <AddAppointments
                    formDisplay={this.state.formDisplay}
                    toggleForm={this.toggleForm}
                    addAppointment={this.addAppointment}
                  /> 

                   <SearchAppointments
                    orderBy={this.state.orderBy}
                    orderDir={this.state.orderDir}
                    changeOrder={this.changeOrder}
                    searchApts={this.searchApts}
                  />
                  {viewAllbtn}
                  <ListAppointments
                    appointments={filteredApts}
                    showRecord={this.showRecord}
                    deleteAppointment={this.deleteAppointment}
                    petNameRecord={this.state.petNameRecord}
                    updateInfo={this.updateInfo}
                  /> 
                </div>
              </div>
            </div>
          </div>
        </main>
    );
  }
 
}

export default App;
