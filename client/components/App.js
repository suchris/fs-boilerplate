import React from "react";
import { connect } from "react-redux";

//import any sub-components
import { getCampuses, getStudents } from "../store";
import Nav from "./nav";
import Campus from "./campus";
import Student from "./student";

class App extends React.Component {
  //constructor to initialize state
  componentDidMount() {
    this.props.getCampuses();
    this.props.getStudents();
  }

  //any lifecycle methods
  //any custom methods

  //render
  render() {
    <div>
      <Nav />
      <Campus />
    </div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampuses: () => dispatch(getCampuses()),
    getStudents: () => dispatch(getStudents()),
  };
};

export default connect(null, mapDispatchToProps)(App);
