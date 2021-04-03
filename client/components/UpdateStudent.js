import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStudent } from "../redux/actions";

class UpdateStudent extends Component {
  constructor(props) {
    super(props);
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
    const newState = { ...this.state };
    newState.student[ev.target.name] = ev.target.value;
    this.setState(newState);
  }

  onSubmit(ev) {
    ev.preventDefault();

    const { history, updateStudent } = this.props;
    updateStudent(this.state.student, history);
  }

  render() {
    const { student } = this.state;

    if (!student) {
      return <h3>Loading...</h3>;
    }

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
