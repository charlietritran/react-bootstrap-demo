import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    let tempSearch = {
      query: this.state.query,
    };

    this.props.querySearch(tempSearch);

    this.setState({
      query: "",
    });

    this.props.toggleForm();
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div
        className={
          "card textcenter mt-3" + (this.props.formDisplay ? "" : "search-data")
        }
      >
        <div
          className="srch-heading card-header bg-primary text-white"
          onClick={this.props.toggleForm}
        >
          <FaSearch /> Search Data
        </div>

        <div className="card-body">
          <form id="searchForm" noValidate onSubmit={this.handleAdd}>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="query"
                aria-readonly
              >
                query
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="query"
                  placeholder="search condition"
                  value={this.state.query}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Execute
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
