import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { unregisterStudent } from "../store";

class SingleCampus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props.match.params;
    const { campuses, unregisterStudent, history } = this.props;
    const campus = campuses.find((campus) => campus.id === id * 1);

    if (!campus) {
      return <h3>Loading...</h3>;
    }

    return (
      <div className="campus" key={campus.id}>
        <div className="left-container">
          <img src={campus.imageUrl} />
        </div>
        <div className="right-container">
          <h3>{campus.name}</h3>
          <small>{campus.address}</small>
          <p>{campus.description}</p>
          <Link to={`/campuses/${campus.id}/update`}>Update Campus</Link>
        </div>
        <div className="bottom-container">
          <h4>Students affiliate with campus:</h4>
          <ul>
            {campus.students.length === 0 ? (
              <p>No students</p>
            ) : (
              campus.students.map((student) => {
                return (
                  <li key={student.id}>
                    <Link to={`/students/${student.id}`}>
                      {student.firstName} {student.lastName}
                    </Link>
                    <button
                      onClick={() =>
                        unregisterStudent(campus, student, history)
                      }
                    >
                      Unregister
                    </button>
                  </li>
                );
              })
            )}
            <br></br>
          </ul>
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
    unregisterStudent: (campus, student, history) =>
      dispatch(unregisterStudent(campus, student, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
