import React, { useState, useEffect } from "react";
import "../css/App.css";
import AddAppointments from "./AddAppointments";
import ListAppointments from "./ListAppointments";
import SearchAppointments from "./SearchAppointments";
import data from "../data.json";

let isMounted = false;
const App = () => {
  const [mount, setMount] = useState(false);
  const [stateAppointments, setStateAppointments] = useState({
    myAppointments: [],
  });
  const [stateIndex, setStateIndex] = useState({
    lastIndex: 1,
  });
  const [orderBy, setOrderBy] = useState("petName");
  const [orderDir, setOrderDir] = useState("asc");
  const [formDisplay, setFormDisplay] = useState(false);
  const [petNameRecord, setPetNameRecord] = useState("");
  const [queryText, setQueryText] = useState("");

  useEffect(() => {
    isMounted = true;
    if (!mount) {
      setMount(!mount);
      if (isMounted) {
        const newData = [...data];
        const apts = newData.map((item, index) => {
          item.aptId = index + 1;
          setStateIndex({ lastIndex: item.aptId });
          return item;
        });

        setStateAppointments({ myAppointments: apts });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [mount, stateIndex.lastIndex]);

  const toggleForm = () => {
    setFormDisplay(!formDisplay);
  };

  const searchApts = (query) => {
    setQueryText(query);
  };
  const changeOrder = (order, dir) => {
    setOrderBy(order);
    setOrderDir(dir);
  };

  const showRecord = (petname) => {
    setPetNameRecord(petname ? petname.toLowerCase() : "");
  };

  const viewAll = () => {
    setPetNameRecord("");
  };

  const updateInfo = (name, value, id) => {
    const newState = { ...stateAppointments };
    let obj = stateAppointments.myAppointments.find(
      (elem) => elem.aptId === id
    );
    let aptIndex = stateAppointments.myAppointments.indexOf(obj);
    newState.myAppointments[aptIndex][name] = value;
    setStateAppointments(newState);
  };

  const addAppointment = (apt) => {
    let tempApts = stateAppointments.myAppointments;
    apt.aptId = stateIndex.lastIndex + 1;
    tempApts.unshift(apt);

    setStateAppointments({
      myAppointments: tempApts,
    });

    setStateIndex({
      lastIndex: stateIndex.lastIndex + 1,
    });
  };

  // USING FILTER AND ID
  const deleteAppointment = (id) => {
    let updatedApts = stateAppointments.myAppointments.filter(
      (apt) => apt.aptId !== id
    );
    setStateAppointments({
      myAppointments: updatedApts,
    });
  };

  let order;
  let filteredApts = stateAppointments.myAppointments;
  let viewAllbtn = "";
  const noFilteredApts =
    !filteredApts || (filteredApts && filteredApts.length === 0);

  if (petNameRecord !== "" && !noFilteredApts) {
    filteredApts = filteredApts.filter(
      (item) => item.petName.toLowerCase() === petNameRecord
    );
    if (orderDir === "asc") {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts
      .sort((a, b) => {
        if (a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter((eachItem) => {
        return (
          eachItem["petName"].toLowerCase().includes(queryText.toLowerCase()) ||
          eachItem["ownerName"]
            .toLowerCase()
            .includes(queryText.toLowerCase()) ||
          eachItem["aptNotes"].toLowerCase().includes(queryText.toLowerCase())
        );
      });
    viewAllbtn = (
      <button onClick={() => viewAll()}>
        <span className="label-item">View All Records </span>
      </button>
    );
  } else {
    if (orderDir === "asc" && !noFilteredApts) {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts
      .sort((a, b) => {
        if (a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter((eachItem) => {
        return (
          eachItem["petName"].toLowerCase().includes(queryText.toLowerCase()) ||
          eachItem["ownerName"]
            .toLowerCase()
            .includes(queryText.toLowerCase()) ||
          eachItem["aptNotes"].toLowerCase().includes(queryText.toLowerCase())
        );
      });
  }

  return (
    <main
      basename={process.env.PUBLIC_URL}
      className="page bg-white"
      id="petratings"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <h1>Pet Sessions</h1>
              <AddAppointments
                formDisplay={formDisplay}
                toggleForm={toggleForm}
                addAppointment={addAppointment}
              />
              <SearchAppointments
                orderBy={orderBy}
                orderDir={orderDir}
                changeOrder={changeOrder}
                searchApts={searchApts}
              />
              {viewAllbtn}
              <ListAppointments
                appointments={filteredApts}
                showRecord={showRecord}
                deleteAppointment={deleteAppointment}
                petNameRecord={petNameRecord}
                updateInfo={updateInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
