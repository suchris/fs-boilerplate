import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStudent, registerStudent } from "../redux/actions";

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
    const { name, value } = ev.target;
    const newState = { ...this.state };
    newState.student[name] = value;
    this.setState(newState);
  }

  onSubmit(ev) {
    ev.preventDefault();

    const { history, updateStudent } = this.props;
    const { student } = this.state;
    updateStudent(student, history);
  }

  render() {
    const { student } = this.state;
    const { campuses } = this.props;

    if (!student) {
      return <h3>Loading...</h3>;
    }

    const campusSelected = student.campusId !== null;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={student.firstName}
            onChange={this.onChange}
          />
          <br></br>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={student.lastName}
            onChange={this.onChange}
          />
          <br></br>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={student.email}
            onChange={this.onChange}
          />
          {/* <br></br>
          <label>Choose a campus:</label>
          <select
            name="campusId"
            id="campus-select"
            defaultValue={campusSelected ? student.campus.id : ""}
            onChange={this.onChange}
          >
            <option>--Please choose an option--</option>
            {campuses.map((campus) => {
              return (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              );
            })}
          </select> */}
          <br></br>
          <button>Update</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    campuses: state.campuses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (student, history) =>
      dispatch(updateStudent(student, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent);
