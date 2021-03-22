import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";

//import any sub-components
import { getCampuses, getStudents } from "../store";
import Nav from "./nav";
import Campus from "./campus";
import Student from "./student";
import SingleCampus from "./single-campus";
import SingleStudent from "./single-student";

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
      <Router>
        <Route component={Nav} />
        <Route component={Campus} path="/campuses" exact />
        <Route component={SingleCampus} path="/campuses/:id" exact />

        <Route component={Student} path="/students" exact />
        <Route component={SingleStudent} path="/students/:id" exact />
      </Router>
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
