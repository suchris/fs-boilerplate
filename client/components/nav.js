import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Nav = ({ campuses, students, location: { pathname } }) => {
  return (
    <nav>
      <Link
        to="/campuses"
        className={pathname === "/campuses" ? "selected" : ""}
      >
        Campuses ({campuses.length})
      </Link>
      <Link
        to="/students"
        className={pathname === "/students" ? "selected" : ""}
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
