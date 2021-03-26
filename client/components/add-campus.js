import React, { Component } from "react";
import { connect } from "react-redux";
import { createCampus } from "../store";

class AddCampus extends Component {
  constructor() {
    super();
    this.state = {
      name: undefined,
      imageUrl: undefined,
      address: undefined,
      description: undefined,
      students: [],
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

    const { history, createCampus } = this.props;
    createCampus(this.state, history);
  }

  render() {
    const { name, imageUrl, address, description } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Name
            <input type="text" name="name" onChange={this.onChange} />
          </label>
          <label>
            Address
            <input type="text" name="address" onChange={this.onChange} />
          </label>
          <button disabled={!name || !address}>Add</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCampus: (campus, history) => dispatch(createCampus(campus, history)),
  };
};

export default connect(null, mapDispatchToProps)(AddCampus);
