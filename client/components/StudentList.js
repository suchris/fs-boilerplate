import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStudent } from "../redux/actions";

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: false, sort: false };
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    const { name, value } = ev.target;
    const newState = { ...this.state, [name]: value === "true" ? true : false };
    this.setState(newState);
  }

  render() {
    const { students, history, deleteStudent } = this.props;
    const { filter, sort } = this.state;

    if (!students) {
      return <h3>Loading...</h3>;
    }

    var filterStudents = students;

    if (filter) {
      filterStudents = students.filter((s) => s.campusId === null);
    }

    if (sort) {
      filterStudents = filterStudents.sort((a, b) => (a.gpa < b.gpa ? 1 : -1));
    } else {
      filterStudents = filterStudents.sort((a, b) =>
        a.lastName > b.lastName ? 1 : -1
      );
    }

    return (
      <div>
        <h3>List of Students</h3>
        <Link to="/students/create">Add New Student</Link>
        <hr></hr>
        <select
          name="filter"
          id="filter-select"
          defaultValue={false}
          onChange={this.onChange}
        >
          <option value={false}>Show all students</option>
          <option value={true}>Show unregistered students only</option>
        </select>
        <select
          name="sort"
          id="sort-select"
          defaultValue={false}
          onChange={this.onChange}
        >
          <option value={false}>Sort by last name</option>
          <option value={true}>Sort by gpa</option>
        </select>
        <div className="list">
          {filterStudents.map((student) => {
            return (
              <div key={student.id} className="card">
                <Link to={`/students/${student.id}`}>
                  <img src={student.imageUrl} />
                  <p className="card_name">
                    {student.firstName} {student.lastName}
                  </p>
                  <p>{student.email}</p>
                  <p>GPA: {student.gpa}</p>
                </Link>
                <button onClick={() => deleteStudent(student, history)}>
                  Delete
                </button>
              </div>
            );
          })}
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (student) => dispatch(deleteStudent(student)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
