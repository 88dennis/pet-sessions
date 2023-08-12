import React, { useState, useEffect } from "react";
import "../css/App.css";

import AddItems from "./AddItems";
import ListItems from "./ListItems";
import SearchItems from "./SearchItems";
import data from "../data.json";

let isMounted = false;
// let data = [];
const App = () => {
  const [mount, setMount] = useState(false);
  const [stateItems, setStateItems] = useState({
    myItems: [],
  });
  
  const [stateIndex, setStateIndex] = useState({
    lastIndex: 1,
  });
  const [orderBy, setOrderBy] = useState("petName");
  const [orderDir, setOrderDir] = useState("asc");
  const [formDisplay, setFormDisplay] = useState(false);
  const [nameOnRecord, setNameOnRecord] = useState("");

  const [queryText, setQueryText] = useState("");

  useEffect(() => {
    isMounted = true;
    if (!mount) {
      setMount(!mount);
      if (isMounted) {

        if(data && data.length !== 0){
          const newData = [...data];
          const apts = newData.map((item, index) => {
            item.aptId = index + 1;
            setStateIndex({ lastIndex: item.aptId });
            return item;
          });
          setStateItems({ myItems: apts });
        }
      }
    }
    return () => {
      isMounted = false;
    };
  }, [mount, stateIndex.lastIndex]);

  const toggleForm = () => {
    setFormDisplay(!formDisplay);
  };

  const searchItems = (query) => {
    setQueryText(query);
  };
  const changeOrder = (order, dir) => {
    setOrderBy(order);
    setOrderDir(dir);
  };

  const showRecord = (recordName) => {
    setNameOnRecord(recordName ? recordName.toLowerCase() : "");
  };

  const viewAll = () => {
    setNameOnRecord("");
  };

  const updateInfo = (name, value, id) => {
    const newState = { ...stateItems };
    let obj = stateItems.myItems.find(
      (elem) => elem.aptId === id
    );
    let aptIndex = stateItems.myItems.indexOf(obj);
    newState.myItems[aptIndex][name] = value;
    setStateItems(newState);
  };

  const addItem = (apt) => {
    let tempApts = stateItems.myItems;
    apt.aptId = stateIndex.lastIndex + 1;
    tempApts.unshift(apt);

    setStateItems({
      myItems: tempApts,
    });

    setStateIndex({
      lastIndex: stateIndex.lastIndex + 1,
    });
  };

  // USING FILTER AND ID
  const deleteItem = (id) => {
    let updatedApts = stateItems.myItems.filter(
      (apt) => apt.aptId !== id
    );
    setStateItems({
      myItems: updatedApts,
    });
  };

  let order;
  let filteredItems = stateItems.myItems;
  let viewAllbtn = "";
  const noFilteredItems =
    !filteredItems || (filteredItems && filteredItems.length === 0);

  if (nameOnRecord !== "" && !noFilteredItems) {
    filteredItems = filteredItems.filter(
      (item) => item.petName.toLowerCase() === nameOnRecord
    );
    if (orderDir === "asc") {
      order = 1;
    } else {
      order = -1;
    }

    filteredItems = filteredItems
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
    if (orderDir === "asc" && !noFilteredItems) {
      order = 1;
    } else {
      order = -1;
    }

    filteredItems = filteredItems
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
              <AddItems
                formDisplay={formDisplay}
                toggleForm={toggleForm}
                addItem={addItem}
              />
              <SearchItems
                orderBy={orderBy}
                orderDir={orderDir}
                changeOrder={changeOrder}
                searchItems={searchItems}
              />
              {viewAllbtn}
              <ListItems
                filteredItems={filteredItems}
                showRecord={showRecord}
                deleteItem={deleteItem}
                nameOnRecord={nameOnRecord}
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
