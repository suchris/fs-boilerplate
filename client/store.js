import { createStore, applyMiddleware, bindActionCreators } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

// INITIAL STATE
const initialState = {
  campuses: [],
  students: [],
};

// ACTION TYPES
const GET_CAMPUSES = "GET_CAMPUSES";
const GET_STUDENTS = "GET_STUDENTS";

// ACTION CREATORS
const getCampusesAction = (campuses) => ({
  type: GET_CAMPUSES,
  campuses,
});

export const getCampuses = () => {
  return async (dispatch) => {
    const campuses = (await axios.get("api/campuses")).data;
    dispatch(getCampusesAction(campuses));
  };
};

const getStudentsAction = (students) => ({
  type: GET_STUDENTS,
  students,
});

export const getStudents = () => {
  return async (dispatch) => {
    const students = (await axios.get("/api/students")).data;
    dispatch(getStudentsAction(students));
  };
};

// REDUCERS
function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPUSES:
      const { campuses } = action;
      return { ...state, campuses };

    case GET_STUDENTS:
      const { students } = action;
      return { ...state, students };

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);

export default store;
