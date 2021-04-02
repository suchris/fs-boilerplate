import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCampus } from "../store";

class Campus extends Component {
  render() {
    const { campuses, history, deleteCampus } = this.props;

    if (!campuses) {
      return <h3>Loading...</h3>;
    }

    return (
      <div>
        <h3>List of Campus</h3>
        <Link to="/campuses/add">Add Campus</Link>
        <hr></hr>
        <div className="campuses">
          {campuses.map((campus) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
