import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

//import any sub-components
import { getCampuses, getStudents } from "../store";
import Nav from "./nav";
import Campus from "./campus";
import Student from "./student";
import SingleCampus from "./single-campus";
import SingleStudent from "./single-student";
import AddCampus from "./add-campus";
import AddStudent from "./add-student";

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
        <Switch>
          <Route component={AddCampus} path="/campuses/add" exact />
          <Route component={SingleCampus} path="/campuses/:id" exact />
        </Switch>
        <Route component={Student} path="/students" exact />
        <Switch>
          <Route component={AddStudent} path="/students/add" exact />
          <Route component={SingleStudent} path="/students/:id" exact />
        </Switch>
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
