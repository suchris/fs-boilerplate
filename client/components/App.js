import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";

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
    return (
      <div id="app">
        <Router>
          <Route component={Nav} />
          <Route component={Campus} path="/campuses" exact />
          <Route component={Student} path="/students" exact />
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampuses: () => dispatch(getCampuses()),
    getStudents: () => dispatch(getStudents()),
  };
};

export default connect(null, mapDispatchToProps)(App);
