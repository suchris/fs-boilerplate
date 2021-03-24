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
const CREATE_CAMPUS = "CREATE_CAMPUS";
const CREATE_STUDENT = "CREATE_STUDENT";
const DELETE_CAMPUS = "DELETE_CAMPUS";
const DELETE_STUDENT = "DELETE_STUDENT";

// ACTION CREATORS
const getCampusesAction = (campuses) => ({
  type: GET_CAMPUSES,
  campuses,
});

export const getCampuses = () => {
  return async (dispatch) => {
    const campuses = (await axios.get("/api/campuses")).data;
    dispatch(getCampusesAction(campuses));
  };
};

const createCampusAction = (campus) => ({
  type: CREATE_CAMPUS,
  campus,
});

export const createCampus = (
  { name, imageUrl, address, description },
  history
) => {
  console.log("history", history);
  return async (dispatch) => {
    const campus = (
      await axios.post("/api/campuses", {
        name,
        imageUrl,
        address,
        description,
      })
    ).data;
    dispatch(createCampusAction(campus));
    history.push(`/campuses/${campus.id}`);
  };
};

const deleteCampusAction = (campus) => ({
  type: DELETE_CAMPUS,
  campus,
});

export const deleteCampus = (campus) => {
  return async (dispatch) => {
    await axios.delete(`/api/campuses/${campus.id}`);
    dispatch(deleteCampusAction(campus));
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

const createStudentAction = (student) => ({
  type: CREATE_STUDENT,
  student,
});

export const createStudent = (
  { firstName, lastName, email, imageUrl, gpa },
  history
) => {
  return async (dispatch) => {
    const student = (
      await axios.post("/api/students", {
        firstName,
        lastName,
        email,
        imageUrl,
        gpa,
      })
    ).data;
    dispatch(createStudentAction(student));
    history.push(`/students/${student.id}`);
  };
};

const deleteStudentAction = (student) => ({
  type: DELETE_STUDENT,
  student,
});

export const deleteStudent = (student, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/students/${student.id}`);
    dispatch(deleteStudentAction(student));
    history.push("/students");
  };
};

// REDUCERS
function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPUSES:
      {
        const { campuses } = action;
        return { ...state, campuses };
      }
      break;
    case GET_STUDENTS:
      {
        const { students } = action;
        return { ...state, students };
      }
      break;
    case CREATE_CAMPUS:
      {
        const { campus } = action;
        const { campuses } = state;
        return { ...state, campuses: [...campuses, campus] };
      }
      break;
    case CREATE_STUDENT:
      {
        const { student } = action;
        const { students } = state;
        return { ...state, students: [...students, student] };
      }
      break;
    case DELETE_CAMPUS:
      {
        const { campus } = action;
        const { campuses } = state;
        return {
          ...state,
          campuses: [...campuses.filter((c) => c.id !== campus.id)],
        };
      }
      break;
    case DELETE_STUDENT:
      {
        const { student } = action;
        const { students } = state;
        return {
          ...state,
          students: [...students.filter((s) => s.id !== student.id)],
        };
      }
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
