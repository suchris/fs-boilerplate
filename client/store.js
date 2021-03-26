import { createStore, applyMiddleware, bindActionCreators } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

// INITIAL STATE
const initialState = {
  campuses: [],
  students: [],
  selectedCampus: undefined,
  selectedStudent: undefined,
};

// ACTION TYPES
const GET_CAMPUSES = "GET_CAMPUSES";
const GET_STUDENTS = "GET_STUDENTS";
const GET_CAMPUS = "GET_CAMPUS";
const GET_STUDENT = "GET_STUDENT";
const CREATE_CAMPUS = "CREATE_CAMPUS";
const CREATE_STUDENT = "CREATE_STUDENT";
const DELETE_CAMPUS = "DELETE_CAMPUS";
const DELETE_STUDENT = "DELETE_STUDENT";
const UPDATE_CAMPUS = "UPDATE_CAMPUS";
const UPDATE_STUDENT = "UPDATE_STUDENT";
const UNREGISTER_STUDENT = "UNREGISTER_STUDENT";

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

const getCampusAction = (campus) => ({
  type: GET_CAMPUSES,
  campus,
});

export const getCampus = (id) => {
  return async (dispatch) => {
    const campus = (await axios.get(`/api/campuses/${id}`)).data;
    dispatch(getCampusAction(campus));
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

const updateCampusAction = (campus) => ({
  type: UPDATE_CAMPUS,
  campus,
});

export const updateCampus = (campus, history) => {
  return async (dispatch) => {
    const updateCampus = (await axios.put(`/api/campuses/${campus.id}`, campus))
      .data;
    dispatch(updateCampusAction(updateCampus));
    history.push(`/campuses/${updateCampus.id}`);
  };
};

const unregisterStduentAction = (campus, student) => ({
  type: UNREGISTER_STUDENT,
  campus,
  student,
});

export const unregisterStudent = (campus, student, history) => {
  return async (dispatch) => {
    const updateStudent = (
      await axios.put(`/api/students/${student.id}`, {
        ...student,
        campusId: null,
      })
    ).data;
    dispatch(unregisterStduentAction(campus, updateStudent));
    history.push(`/campuses/${campus.id}`);
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

const getStudentAction = (student) => ({
  type: GET_STUDENT,
  student,
});

export const getStudent = (id) => {
  return async (dispatch) => {
    const student = (await axios.get(`/api/students/${id}`)).data;
    dispatch(getStudentAction(student));
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

const updateStudentAction = (student) => ({
  type: UPDATE_STUDENT,
  student,
});

export const updateStudent = (student, history) => {
  return async (dispatch) => {
    const updateStudent = (
      await axios.put(`/api/students/${student.id}`, student)
    ).data;
    dispatch(updateStudentAction(updateStudent));
    history.push(`/students/${updateStudent.id}`);
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
    case GET_CAMPUS:
      {
        const { campus } = action;
        return { ...state, selectdCampus: campus };
      }
      break;
    case GET_STUDENTS:
      {
        const { students } = action;
        return { ...state, students };
      }
      break;
    case GET_STUDENT:
      {
        const { student } = action;
        return { ...state, selectedStudent: student };
      }
      break;
    case CREATE_CAMPUS:
      {
        const { campus } = action;
        if (!campus.students) {
          campus[students] = [];
        }
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
    case UPDATE_CAMPUS:
      {
        const { campus } = action;
        const { campuses } = state;
        return {
          ...state,
          campuses: [
            ...campuses.map((c) => {
              if (c.id === campus.id) {
                return { ...campus, students: c.students };
              } else {
                return c;
              }
            }),
          ],
        };
      }
      break;
    case UNREGISTER_STUDENT:
      {
        const { campus, student } = action;

        // remove student form campus
        const studentsAtCampus = campus.students.filter(
          (s) => s.id !== student.id
        );

        // update campuses
        const campuses = state.campuses.map((c) => {
          if (c.id === campus.id) {
            return { ...c, students: studentsAtCampus };
          } else {
            return c;
          }
        });

        // update students list
        const students = state.students.map((s) => {
          if (s.id === student.id) {
            return { ...s, campusId: null };
          } else {
            return s;
          }
        });
        return { ...state, campuses, students };
      }
      break;
    case UPDATE_STUDENT:
      {
        const { student } = action;
        const { students } = state;
        return {
          ...state,
          students: [
            ...students.map((s) =>
              s.id === student.id ? { ...s, ...student } : s
            ),
          ],
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
