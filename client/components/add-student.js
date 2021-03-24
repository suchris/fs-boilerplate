import React, { Component } from "react";
import { connect } from "react-redux";
import { createStudent } from "../store";

class AddStudent extends Component {
  constructor() {
    super();
    this.state = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      imageUrl: undefined,
      gpa: undefined,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    console.log(ev.target);

    const newState = { ...this.state };
    newState[ev.target.name] = ev.target.value;
    this.setState(newState);
  }

  onSubmit(ev) {
    console.log(ev.target);

    ev.preventDefault();
    console.log(this.state);

    const { history, createStudent } = this.props;
    createStudent(this.state, history);
  }

  render() {
    const { firstName, lastName, email, imageUrl, gpa } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            First Name
            <input type="text" name="firstName" onChange={this.onChange} />
          </label>
          <label>
            Last Name
            <input type="text" name="lastName" onChange={this.onChange} />
          </label>
          <label>
            Email
            <input type="text" name="email" onChange={this.onChange} />
          </label>
          <button disabled={!firstName || !lastName || !email}>Add</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createStudent: (student, history) =>
      dispatch(createStudent(student, history)),
  };
};

export default connect(null, mapDispatchToProps)(AddStudent);
