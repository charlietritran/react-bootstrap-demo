import { Component } from "react";
import "../css/styles.css";

class AppHeader extends Component {
  // Constructor for initilization of Attributes
  constructor(props) {
    super(props);
    this.state = { Title: "Enter The Title" };
  }

  //Used for changing the state once data is loaded
  //Note : This is not req. here.
  componentDidMount() {
    setTimeout(() => {
      this.setState({ Title: "Welcome" });
    }, 100);
  }

  //used for overriding the deafult value
  //set by constructor based on input from calling location
  //This is the first method that is called when a component gets updated.
  static getDerivedStateFromProps(props, state) {
    return { Title: props.title };
  }

  //for actually outputs the HTML to the DOM.
  render() {
    return <div className="Title"> {this.state.Title} </div>;
  }
}

export default AppHeader;
