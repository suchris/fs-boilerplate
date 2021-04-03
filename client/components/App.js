import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

//import actions to initialize state
import { getCampuses, getStudents } from "../redux/actions";

//import any sub-components
import Nav from "./Nav";
import CampusList from "./CampusList";
import StudentList from "./StudentList";
import SingleCampus from "./SingleCampus";
import SingleStudent from "./SingleStudent";
import CreateCampus from "./CreateCampus";
import CreateStudent from "./CreateStudent";
import UpdateCampus from "./UpdateCampus";
import UpdateStudent from "./UpdateStudent";

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
        <Route component={CampusList} path="/campuses" exact />
        <Switch>
          <Route component={CreateCampus} path="/campuses/create" exact />
          <Route component={SingleCampus} path="/campuses/:id" />
        </Switch>
        <Route component={UpdateCampus} path="/campuses/:id/update" exact />
        <Route component={StudentList} path="/students" exact />
        <Switch>
          <Route component={CreateStudent} path="/students/create" exact />
          <Route component={SingleStudent} path="/students/:id" />
        </Switch>
        <Route component={UpdateStudent} path="/students/:id/update" exact />
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
