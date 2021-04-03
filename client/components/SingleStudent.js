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

    if (!student) {
      return <h3>Loading...</h3>;
    }

    return (
      <div className="container" key={student.id}>
        <div className="top-container">
          <div className="left-container">
            <img src={student.imageUrl} />
          </div>
          <div className="right-container">
            <h3>
              {student.firstName} {student.lastName}
            </h3>
            <p>Email: {student.email}</p>
            <p>GPA: {student.gpa}</p>
            <Link to={`/students/${student.id}/update`}>Update</Link>
          </div>
        </div>
        <div className="bottom-container">
          Affiliate Campus:
          {student.campus && student.campus.id ? (
            <Link to={`/campuses/${student.campus.id}`}>
              {student.campus.name}
            </Link>
          ) : (
            <p>No campus info</p>
          )}
        </div>
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
