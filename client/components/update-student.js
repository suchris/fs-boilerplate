import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStudent } from "../store";

class UpdateStudent extends Component {
  constructor(props) {
    super(props);

    console.log("updateStudent:", props);

    const { id } = props.match.params;
    const { students } = props;

    const student = students.find((student) => student.id === id * 1);

    if (student.id) {
      this.state = { student: { ...student } };
    } else {
      this.state = {
        student: {
          id: undefined,
          firstName: undefined,
          lastName: undefined,
          imageUrl: undefined,
          email: undefined,
          campusId: undefined,
        },
      };
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    console.log(ev.target);

    const newState = { ...this.state };
    newState.student[ev.target.name] = ev.target.value;
    this.setState(newState);
  }

  onSubmit(ev) {
    console.log(ev.target);

    ev.preventDefault();
    console.log("updateStudent on Submit", this.state);

    const { history, updateStudent } = this.props;
    console.log("updateStudent:", this.state.student);
    updateStudent(this.state.student, history);
  }

  render() {
    const { student } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            First Name
            <input
              type="text"
              name="firstName"
              value={student.firstName}
              onChange={this.onChange}
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="lastName"
              value={student.lastName}
              onChange={this.onChange}
            />
          </label>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={student.email}
              onChange={this.onChange}
            />
          </label>
          <button>Update</button>
        </form>
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
    updateStudent: (student, history) =>
      dispatch(updateStudent(student, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent);
