import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Nav = ({ campuses, students, location: { pathname } }) => {
  // if data is not available defer to App ComponentDidMount to fetch data
  if (campuses.length === 0 && students.length === 0) {
    return <h3>Loading...</h3>;
  }

  return (
    <nav>
      <Link
        to="/campuses"
        className={pathname.startsWith("/campuses") ? "selected" : ""}
      >
        Campuses ({campuses.length})
      </Link>
      <Link
        to="/students"
        className={pathname.startsWith("/students") ? "selected" : ""}
      >
        Students ({students.length})
      </Link>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students,
  };
};

export default connect(mapStateToProps)(Nav);
