import React, { Component } from "react";
import { connect } from "react-redux";

class Campus extends Component {
  render() {
    const { campuses } = this.props;

    return (
      <div classNames="campuses">
        <h3>List of Campus</h3>
        <ul>
          {campuses.map((campus) => {
            return (
              <li key={campus.id}>
                <img src={campus.imageUrl}></img>
                {campus.name}
              </li>
            );
          })}
        </ul>
        );
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
