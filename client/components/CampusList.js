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

    var sortCampuses = campuses.sort((a, b) =>
      a.students.length < b.students.length ? 1 : -1
    );

    if (!sort) {
      sortCampuses = campuses.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    return (
      <div>
        <h3>List of Campus</h3>
        <select
          name="sort"
          id="sort-select"
          defaultValue={true}
          onChange={this.onClick}
        >
          <option value={true}>Sort by student count</option>
          <option value={false}>Sort by name</option>
        </select>
        <Link to="/campuses/create">Add Campus</Link>
        <hr></hr>
        <div className="campuses">
          {sortCampuses.map((campus) => {
            return (
              <div key={campus.id}>
                <img src={campus.imageUrl} />
                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                <p>{campus.students ? campus.students.length : 0} students</p>
                <button onClick={() => deleteCampus(campus, history)}>x</button>
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
