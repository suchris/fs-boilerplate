import { createStore, applyMiddleware, bindActionCreators } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

// INITIAL STATE
const initialState = {
  campuses: [],
  students: [],
  selectedCampus: undefined,
  selectedStudents: undefined,
  unassignedStudents: [],
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
const REGISTER_STUDENT = "REGISTER_STUDENT";

// ACTION CREATORS
const getCampusesAction = (campuses) => ({
  type: GET_CAMPUSES,
  campuses,
});

const getCampuses = () => {
  return async (dispatch) => {
    const campuses = (await axios.get("/api/campuses")).data;
    dispatch(getCampusesAction(campuses));
  };
};

const getCampusAction = (campus) => ({
  type: GET_CAMPUSES,
  campus,
});

const getCampus = (id) => {
  return async (dispatch) => {
    const campus = (await axios.get(`/api/campuses/${id}`)).data;
    dispatch(getCampusAction(campus));
  };
};

const createCampusAction = (campus) => ({
  type: CREATE_CAMPUS,
  campus,
});

const createCampus = ({ name, imageUrl, address, description }, history) => {
  return async (dispatch) => {
    const campus = (
      await axios.post("/api/campuses", {
        name,
        imageUrl,
        address,
        description,
      })
    ).data;
    const addedCampus = (await axios.get(`/api/campuses/${campus.id}`)).data;
    dispatch(createCampusAction(addedCampus));

    history.push(`/campuses/${campus.id}`);
  };
};

const deleteCampusAction = (campus, students) => ({
  type: DELETE_CAMPUS,
  campus,
  students,
});

const deleteCampus = (campus) => {
  return async (dispatch) => {
    await axios.delete(`/api/campuses/${campus.id}`);
    const students = (await axios.get("/api/students")).data;
    dispatch(deleteCampusAction(campus, students));
  };
};

const updateCampusAction = (campus, students) => ({
  type: UPDATE_CAMPUS,
  campus,
  students,
});

const updateCampus = (campus, history) => {
  return async (dispatch) => {
    let updatedCampus = (await axios.put(`/api/campuses/${campus.id}`, campus))
      .data;
    updatedCampus = (await axios.get(`/api/campuses/${campus.id}`)).data;
    const students = (await axios.get("/api/students")).data;
    dispatch(updateCampusAction(updatedCampus, students));
    history.push(`/campuses/${updatedCampus.id}`);
  };
};

const unregisterStduentAction = (campus, student) => ({
  type: UNREGISTER_STUDENT,
  campus,
  student,
});

const unregisterStudent = (campus, student, history) => {
  return async (dispatch) => {
    let updatedStudent = (
      await axios.put(`/api/students/${student.id}`, { campusId: null })
    ).data;
    updatedStudent = { ...updatedStudent, campus: null };
    const updatedCampus = (await axios.get(`api/campuses/${campus.id}`)).data;
    dispatch(unregisterStduentAction(updatedCampus, updatedStudent));

    history.push(`/campuses/${campus.id}`);
  };
};

const registerStudentAction = (campus, student) => ({
  type: REGISTER_STUDENT,
  campus,
  student,
});

const registerStudent = (campus, student, history) => {
  console.log("registerStudent: ", campus, student);
  return async (dispatch) => {
    let updatedStudent = (
      await axios.put(`/api/students/${student.id}`, { campusId: campus.id })
    ).data;
    updatedStudent = { ...updatedStudent, campus };
    const updatedCampus = (await axios.get(`api/campuses/${campus.id}`)).data;
    dispatch(registerStudentAction(updatedCampus, updatedStudent));

    history.push(`/campuses/${campus.id}`);
  };
};

const getStudentsAction = (students) => ({
  type: GET_STUDENTS,
  students,
});

const getStudents = () => {
  return async (dispatch) => {
    const students = (await axios.get("/api/students")).data;
    dispatch(getStudentsAction(students));
  };
};

const getStudentAction = (student) => ({
  type: GET_STUDENT,
  student,
});

const getStudent = (id) => {
  return async (dispatch) => {
    const student = (await axios.get(`/api/students/${id}`)).data;
    dispatch(getStudentAction(student));
  };
};

const createStudentAction = (student) => ({
  type: CREATE_STUDENT,
  student,
});

const createStudent = (
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
    const addedStudent = (await axios.get(`/api/students/${student.id}`)).data;
    dispatch(createStudentAction(addedStudent));

    history.push(`/students/${student.id}`);
  };
};

const deleteStudentAction = (student, campuses) => ({
  type: DELETE_STUDENT,
  student,
  campuses,
});

const deleteStudent = (student, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/students/${student.id}`);
    const campuses = (await axios.get("/api/campuses")).data;
    dispatch(deleteStudentAction(student, campuses));
    history.push("/students");
  };
};

const updateStudentAction = (student, campus) => ({
  type: UPDATE_STUDENT,
  student,
  campus,
});

const updateStudent = (student, history) => {
  return async (dispatch) => {
    const updatedStudent = (
      await axios.put(`/api/students/${student.id}`, student)
    ).data;
    // refetch students data from linked campus
    let campus = null;
    if (updatedStudent.campusId !== null) {
      campus = (await axios.get(`api/campuses/${updatedStudent.campusId}`))
        .data;
    }
    dispatch(updateStudentAction(updatedStudent, campus));
    history.push(`/students/${updatedStudent.id}`);
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
        const unassignedStudents = students.filter((s) => s.campusId === null);
        return { ...state, students, unassignedStudents };
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
        const { students, unassignedStudents } = state;
        if (student.campusId === null)
          unassignedStudents = [...unassignedStudents, student];
        return {
          ...state,
          students: [...students, student],
          unassignedStudents,
        };
      }
      break;
    case DELETE_CAMPUS:
      {
        const { campus, students } = action;
        const { campuses } = state;
        return {
          ...state,
          campuses: [...campuses.filter((c) => c.id !== campus.id)],
          students: students,
        };
      }
      break;
    case DELETE_STUDENT:
      {
        const { student, campuses } = action;
        const { students, unassignedStudents } = state;
        return {
          ...state,
          students: [
            ...students.filter((s) => s.id !== student.id),
            ...unassignedStudents.filter((s) => s.id !== student.id),
          ],
          campuses,
        };
      }
      break;
    case UPDATE_CAMPUS:
      {
        const { campus, students } = action;
        const { campuses } = state;
        return {
          ...state,
          campuses: [
            ...campuses.map((c) => {
              if (c.id === campus.id) {
                return { ...campus };
              } else {
                return c;
              }
            }),
          ],
          students,
        };
      }
      break;
    case UNREGISTER_STUDENT:
      {
        const { campus, student } = action;

        // update campuses
        const campuses = state.campuses.map((c) => {
          if (c.id === campus.id) {
            return { ...c, ...campus };
          } else {
            return c;
          }
        });

        // update students list and unassignedStudents list
        const students = state.students.map((s) => {
          if (s.id === student.id) {
            return { ...s, ...student };
          } else {
            return s;
          }
        });

        const unassignedStudents = [...state.unassignedStudents, student];

        return { ...state, campuses, students, unassignedStudents };
      }
      break;
    case REGISTER_STUDENT:
      {
        const { campus, student } = action;

        // update campuses
        const campuses = state.campuses.map((c) => {
          if (c.id === campus.id) {
            return { ...c, ...campus };
          } else {
            return c;
          }
        });

        // update students list and unassignedStudents list
        const students = state.students.map((s) => {
          if (s.id === student.id) {
            return { ...s, ...student };
          } else {
            return s;
          }
        });

        const unassignedStudents = state.unassignedStudents.filter(
          (s) => s.id !== student.id
        );

        return { ...state, campuses, students, unassignedStudents };
      }
      break;
    case UPDATE_STUDENT:
      {
        const { student, campus } = action;
        const { students, campuses } = state;

        let newCampuses = campuses;
        if (campus !== null) {
          newCampuses = newCampuses.map((c) =>
            c.id === campus.id ? { ...c, ...campus } : c
          );
        }

        return {
          ...state,
          students: [
            ...students.map((s) =>
              s.id === student.id ? { ...s, ...student } : s
            ),
          ],
          campuses: [...newCampuses],
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
export {
  getCampuses,
  getCampus,
  createCampus,
  deleteCampus,
  updateCampus,
  unregisterStudent,
  registerStudent,
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
};
