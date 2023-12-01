import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import PeopleAdd from "./components/PeopleAdd";
import PeopleSearch from "./components/PeopleSearch";
import MenuBar from "./components/MenuBar";
import Registration from "./components/Registration";
import SolrDemo from "./components/SolrDemo";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import * as constants from "./common/Constants";

// FROM VALIDATION SCHEMA)

function App() {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {}, []); // Add empty array to force it run only one time.  no repeat after render

  return (
    <div className="App">
      <Router>
        <MenuBar />
        <Switch>
          <Route exact path={"/" + constants.APP_NAME} component={Home} />
          <Route path={"/" + constants.APP_NAME + "/about"} component={About} />
          <Route
            path={"/" + constants.APP_NAME + "/peopleAdd"}
            component={PeopleAdd}
          />
          <Route
            path={"/" + constants.APP_NAME + "/peopleSearch"}
            component={PeopleSearch}
          />
          <Route
            path={"/" + constants.APP_NAME + "/registration"}
            component={Registration}
          />
          <Route
            path={"/" + constants.APP_NAME + "/solrDemo"}
            component={SolrDemo}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
