import React, { Component } from "react";
import { connect } from "react-redux";

class Student extends Component {
  render() {
    const { students } = this.props.getStudents();

    return (
      <div classNames="students">
        <h3>List of Students</h3>
        <ul>
          {students.map((student) => {
            return (
              <li key={student.id}>
                {student.firstName} {student.lastName}
              </li>
            );
          })}
        </ul>
        );
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
