import axios from "axios";
import {
  GET_CAMPUSES,
  GET_STUDENTS,
  GET_CAMPUS,
  GET_STUDENT,
  CREATE_CAMPUS,
  CREATE_STUDENT,
  DELETE_CAMPUS,
  DELETE_STUDENT,
  UPDATE_CAMPUS,
  UPDATE_STUDENT,
  UNREGISTER_STUDENT,
  REGISTER_STUDENT,
} from "./constants.js";

// ACTION CREATORS
const getCampusesAction = (campuses) => ({
  type: GET_CAMPUSES,
  campuses,
});

const getCampusAction = (campus) => ({
  type: GET_CAMPUS,
  campus,
});

const createCampusAction = (campus) => ({
  type: CREATE_CAMPUS,
  campus,
});

const deleteCampusAction = (campus, students) => ({
  type: DELETE_CAMPUS,
  campus,
  students,
});

const updateCampusAction = (campus, students) => ({
  type: UPDATE_CAMPUS,
  campus,
  students,
});

const unregisterStduentAction = (campus, student) => ({
  type: UNREGISTER_STUDENT,
  campus,
  student,
});

const registerStudentAction = (campus, student) => ({
  type: REGISTER_STUDENT,
  campus,
  student,
});

const getStudentsAction = (students) => ({
  type: GET_STUDENTS,
  students,
});

const getStudentAction = (student) => ({
  type: GET_STUDENT,
  student,
});

const createStudentAction = (student) => ({
  type: CREATE_STUDENT,
  student,
});

const deleteStudentAction = (student, campuses) => ({
  type: DELETE_STUDENT,
  student,
  campuses,
});

const updateStudentAction = (student, campus) => ({
  type: UPDATE_STUDENT,
  student,
  campus,
});

// THUNK CREATORS
const getCampuses = () => {
  return async (dispatch) => {
    const campuses = (await axios.get("/api/campuses")).data;
    dispatch(getCampusesAction(campuses));
  };
};

const getCampus = (id) => {
  return async (dispatch) => {
    const campus = (await axios.get(`/api/campuses/${id}`)).data;
    dispatch(getCampusAction(campus));
  };
};

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

const deleteCampus = (campus) => {
  return async (dispatch) => {
    await axios.delete(`/api/campuses/${campus.id}`);
    const students = (await axios.get("/api/students")).data;
    dispatch(deleteCampusAction(campus, students));
  };
};

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

const getStudents = () => {
  return async (dispatch) => {
    const students = (await axios.get("/api/students")).data;
    dispatch(getStudentsAction(students));
  };
};

const getStudent = (id) => {
  return async (dispatch) => {
    const student = (await axios.get(`/api/students/${id}`)).data;
    dispatch(getStudentAction(student));
  };
};

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

    dispatch(createStudentAction({ ...student, campusId: null, campus: null }));

    history.push(`/students/${student.id}`);
  };
};

const deleteStudent = (student, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/students/${student.id}`);
    const campuses = (await axios.get("/api/campuses")).data;
    dispatch(deleteStudentAction(student, campuses));
    history.push("/students");
  };
};

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
