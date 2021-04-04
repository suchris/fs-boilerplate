import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCampus, registerStudent } from "../redux/actions";
import { Link } from "react-router-dom";

class UpdateCampus extends Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    const { campuses, unassignedStudents } = props;

    const campus = campuses.find((campus) => campus.id === id * 1);

    if (campus.id) {
      this.state = {
        campus: { ...campus },
        unassignedStudents: [...unassignedStudents],
      };
    } else {
      this.state = {
        campus: {
          id: undefined,
          name: undefined,
          imageUrl: undefined,
          address: undefined,
          description: undefined,
          students: [],
        },
        unassignedStudents: [...unassignedStudents],
      };
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAssign = this.onAssign.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(ev) {
    const { name, value } = ev.target;
    const newState = { ...this.state };
    newState.campus[name] = value;
    this.setState(newState);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { history, updateCampus } = this.props;
    updateCampus(this.state.campus, history);
  }

  onAssign(ev) {
    const newState = { ...this.state };
    const { name, value } = ev.target;
    newState[name] = value;
    this.setState(newState);
  }

  onClick() {
    const { history, registerStudent } = this.props;
    const { campus, unassignedStudents, studentId } = this.state;
    const student = unassignedStudents.find((us) => us.id === studentId * 1);
    registerStudent(campus, student, history);
  }

  render() {
    const { campus, unassignedStudents } = this.state;

    if (!campus) {
      return <h3>Loading...</h3>;
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={campus.name}
              onChange={this.onChange}
            />
          </label>
          <label>
            Address
            <input
              type="text"
              name="address"
              value={campus.address}
              onChange={this.onChange}
            />
          </label>
          <button>Update</button>
        </form>
        <div>
          <h3>Students registered to this campus:</h3>
          <ul>
            {campus.students.length === 0 ? (
              <p>No students registered</p>
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
        <div>
          <label>Register a student:</label>
          <select name="studentId" id="student-select" onChange={this.onAssign}>
            <option value="">--Please choose an option--</option>
            {unassignedStudents.map((us) => {
              return (
                <option key={us.id} value={us.id}>
                  {us.firstName} {us.lastName}
                </option>
              );
            })}
          </select>
          <button onClick={() => this.onClick()}>Assign to Campus</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    unassignedStudents: state.unassignedStudents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCampus: (campus, history) => dispatch(updateCampus(campus, history)),
    registerStudent: (campus, student, history) =>
      dispatch(registerStudent(campus, student, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCampus);
