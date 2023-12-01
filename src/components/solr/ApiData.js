import React, { Component } from "react";
import SolrConnector from "react-solr-connector";
import SolrConnectorDemo from "./SolrConectorDemo";

class ApiData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: null,
    };
  }

  doSearch(searchParams) {
    this.setState({ searchParams });
  }

  render() {
    return (
      <SolrConnector searchParams={this.state.searchParams}>
        <SolrConnectorDemo doSearch={this.doSearch.bind(this)} />
      </SolrConnector>
    );
  }
}

export default ApiData;
