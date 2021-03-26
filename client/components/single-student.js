import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SingleStudent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props.match.params;
    const { students } = this.props;

    const student = students.find((student) => student.id === id * 1);

    return (
      <div className="student" key={student.id}>
        <img src={student.imageUrl} />
        <h3>
          {student.firstName} {student.lastName}
        </h3>
        <p>Email: {student.email}</p>
        <p>GPA: {student.gpa}</p>
        Affiliate Campus:
        {student.campus && student.campus.id ? (
          <Link to={`/campuses/${student.campus.id}`}>
            {student.campus.name}
          </Link>
        ) : (
          <p>No campus info</p>
        )}
        <br></br>
        <Link to={`/students/${student.id}/update`}>Update</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
  };
};

export default connect(mapStateToProps, null)(SingleStudent);
