import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCampus } from "../redux/actions";

class CampusList extends Component {
  constructor(props) {
    super(props);
    this.state = { sort: true };
    this.onClick = this.onClick.bind(this);
  }

  onClick(ev) {
    const { name, value } = ev.target;
    const newState = { ...this.state, [name]: value === "true" ? true : false };
    this.setState(newState);
  }

  render() {
    const { campuses, deleteCampus, history } = this.props;
    const { sort } = this.state;

    if (!campuses) {
      return <h3>Loading...</h3>;
    }

    // short by student count then by campus name if count is the same
    var sortCampuses = campuses.sort((a, b) =>
      a.students.length < b.students.length
        ? 1
        : a.students.length === b.students.length
        ? a.name > b.name
          ? 1
          : -1
        : -1
    );

    // sort by campus name
    if (!sort) {
      sortCampuses = campuses.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    return (
      <div>
        <h3>List of Campus</h3>
        <Link to="/campuses/create">Add Campus</Link>
        <hr></hr>
        <select
          name="sort"
          id="sort-select"
          defaultValue={true}
          onChange={this.onClick}
        >
          <option value={true}>Sort by student count</option>
          <option value={false}>Sort by name</option>
        </select>
        <div className="list">
          {sortCampuses.map((campus) => {
            return (
              <div key={campus.id} className="card">
                <Link to={`/campuses/${campus.id}`}>
                  <img src={campus.imageUrl} />
                  <p className="card_name">{campus.name}</p>
                  <p>{campus.students ? campus.students.length : 0} students</p>
                </Link>
                <button onClick={() => deleteCampus(campus, history)}>
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
    campuses: state.campuses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCampus: (campus) => dispatch(deleteCampus(campus)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);
