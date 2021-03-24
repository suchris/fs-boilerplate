import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Student extends Component {
  render() {
    const { students } = this.props;
    console.log("Student: ", students);

    return (
      <div className="students">
        <Link to="/students/add">Add New Student</Link>
        <h3>List of Students</h3>
        <ul>
          {students.map((student) => {
            return (
              <li key={student.id}>
                <img src={student.imageUrl} />
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
  };
};

export default connect(mapStateToProps, null)(Student);
