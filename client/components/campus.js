import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Campus extends Component {
  render() {
    const { campuses } = this.props;
    console.log("Campus:", campuses);

    return (
      <div>
        <h3>List of Campus</h3>
        <Link to="/campuses/add">Add Campus</Link>
        <div className="campuses">
          {campuses.map((campus) => {
            return (
              <div key={campus.id}>
                <img src={campus.imageUrl} />
                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                <p>{campus.student ? campus.students.length : 0} students</p>
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

export default connect(mapStateToProps, null)(Campus);
