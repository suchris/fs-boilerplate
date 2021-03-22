import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Campus extends Component {
  render() {
    const { campuses } = this.props;
    console.log("Campus:", campuses);

    return (
      <div className="campuses">
        <h3>List of Campus</h3>
        {campuses.map((campus) => {
          return (
            <div key={campus.id}>
              <img src={campus.imageUrl} />
              <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
            </div>
          );
        })}
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
