import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

// INITIAL STATE
const initialState = {
  campuses: [],
  students: [],
};

// ACTION TYPES
const GET_CAMPUSES = "GET_CAMPUSES";
const GET_STUDENTS = "GET_STUDENTS";

// ACTION CREATORS
export const getCampuses = (campuses) => ({
  type: GET_CAMPUSES,
  campuses,
});

export const getStudents = (students) => ({
  type: GET_STUDENTS,
  students,
});

// REDUCERS
function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPUSES:
      const { campuses } = action;
      return { ...state, campuses };
      break;
    case GET_STUDENTS:
      const { students } = action;
      return { ...state, students };
      break;
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);

export default store;
