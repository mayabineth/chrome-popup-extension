/*global chrome*/

import React, { useState, useEffect } from "react";
import ApiFunc from "./ApiFunc";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [list, setList] = useState(getLocalStorage());
  const [domain, setDomain] = useState();
  const [data, setData] = useState("");
  const [counterAll, setCounterAll] = useState(0);
  const [counterUniq, setCounterUniq] = useState(0);

  useEffect(() => {
    const getDetails = async () => {
      const tab = await getUrlFromTab();
      const urlToDomain = tab.url.split("/")[2];
      setDomain(urlToDomain);

      const newItem = {
        id: new Date().getTime().toString(),
        title: urlToDomain,
      };
      setList([...list, newItem]);
      setCounterAll(list.length);
      const onlyTitles = list.map((item) => item.title);
      console.log(onlyTitles);
      let uniqueItems = [...new Set(onlyTitles)];
      setCounterUniq(uniqueItems.length);
      const res = await ApiFunc(urlToDomain);
      setData(res);
    };
    getDetails();
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const getUrlFromTab = async () => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    return tab;
  };

  const resetCounters = () => {
    setCounterAll(0);
    setCounterUniq(0);
    localStorage.clear();
  };
  const { ip, rank, location, organization, country_code } = data;

  return (
    <>
      <div className="nav-center">
        <div className="count-data">
          <h5 className="counters">
            Counter All &nbsp;
            <span className="counter-color">{counterAll}</span>
          </h5>
          <h5 className="count">
            Unique Counter &nbsp;
            <span className="counter-color">{counterUniq}</span>
          </h5>
          <button className="btn" onClick={() => resetCounters()}>
            reset counters
          </button>
        </div>
        <div className="api-data">
          <h5>{domain}</h5>
          <h5>{rank && rank}</h5>
          <h5>{ip && ip}</h5>
          <h5>{location && location}</h5>
          <h5>{country_code && country_code}</h5>
          <h5>{organization && organization}</h5>
        </div>
      </div>
    </>
  );
}

export default App;
