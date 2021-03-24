import React, { Component } from "react";
import { connect } from "react-redux";
import campus from "./campus";
import { Link } from "react-router-dom";

const SingleCampus = (props) => {
  const { id } = props.match.params;
  const { campuses } = props;
  console.log("SingleCampus:", props);

  const campus = campuses.find((campus) => campus.id === id * 1);

  return (
    <div className="campus" key={campus.id}>
      <img src={campus.imageUrl} />
      <h3>{campus.name}</h3>
      <small>{campus.address}</small>
      <p>{campus.description}</p>
      <h4>Students affiliate with campus:</h4>
      <ul>
        {!campus.students || campus.students.length === 0 ? (
          <p>No students</p>
        ) : (
          campus.students.map((student) => {
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
  };
};

export default connect(mapStateToProps, null)(SingleCampus);
