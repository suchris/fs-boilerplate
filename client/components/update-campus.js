import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCampus } from "../store";

class UpdateCampus extends Component {
  constructor(props) {
    super(props);

    console.log("updateCampus:", props);

    const { id } = props.match.params;
    const { campuses } = props;

    const campus = campuses.find((campus) => campus.id === id * 1);

    if (campus.id) {
      this.state = { campus: { ...campus } };
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
      };
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    console.log(ev.target);

    const newState = { ...this.state };
    newState.campus[ev.target.name] = ev.target.value;
    this.setState(newState);
  }

  onSubmit(ev) {
    console.log(ev.target);

    ev.preventDefault();
    console.log(this.state);

    const { history, updateCampus } = this.props;
    updateCampus(this.state.campus, history);
  }

  render() {
    const { campus, unregisterStudent } = this.state;
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCampus: (campus, history) => dispatch(updateCampus(campus, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCampus);
