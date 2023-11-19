import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import PeopleAdd from "./components/PeopleAdd";
import PeopleSearch from "./components/PeopleSearch";
import MenuBar from "./components/MenuBar";
import Registration from "./components/Registration";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

// FROM VALIDATION SCHEMA)

function App() {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {}, []); // Add empty array to force it run only one time.  no repeat after render

  return (
    <div className="App">
      <Router>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/peopleAdd" component={PeopleAdd} />
          <Route path="/peopleSearch" component={PeopleSearch} />
          <Route path="/registration" component={Registration} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
