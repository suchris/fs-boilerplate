import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

//import any sub-components
import { getCampuses, getStudents } from "../store";
import Nav from "./nav";
import Campus from "./Campus";
import Student from "./Student";
import SingleCampus from "./single-campus";
import SingleStudent from "./single-student";
import AddCampus from "./add-campus";
import AddStudent from "./add-student";
import UpdateCampus from "./update-campus";
import UpdateStudent from "./update-student";

class App extends React.Component {
  //constructor to initialize state

  //any lifecycle methods
  componentDidMount() {
    this.props.getCampuses();
    this.props.getStudents();
  }

  //any custom methods

  //render
  render() {
    return (
      <Router>
        <Route component={Nav} />
        <Route component={Campus} path="/campuses" exact />
        <Switch>
          <Route component={AddCampus} path="/campuses/add" />
          <Route component={SingleCampus} path="/campuses/:id" />
        </Switch>
        <Route component={UpdateCampus} path="/campuses/:id/update" />
        <Route component={Student} path="/students" exact />
        <Switch>
          <Route component={AddStudent} path="/students/add" exact />
          <Route component={SingleStudent} path="/students/:id" exact />
        </Switch>
        <Route component={UpdateStudent} path="/students/:id/update" />
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
