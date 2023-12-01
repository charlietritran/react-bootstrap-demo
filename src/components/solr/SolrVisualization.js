import "./css/styles.css";
import React, { Component, useState, setState } from "react";
//import Collapse from "react-bootstrap/Collapse";
import cx from "classnames";
import { FaSearch } from "react-icons/fa";
import Search from "./Search";

class SolrVisualization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myQuerySearch: "hello",
      formDisplay: false,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.querySearch = this.querySearch.bind(this);
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay,
    });
  }

  querySearch(filter) {
    this.setState({
      myQuerySearch: filter,
    });
  }

  render() {
    let filter = this.state.myQuerySearch;
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <Search
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  querySearch={this.querySearch}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default SolrVisualization;
