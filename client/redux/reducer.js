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

// INITIAL STATE
const initialState = {
  campuses: [],
  students: [],
  selectedCampus: undefined,
  selectedStudents: undefined,
  unassignedStudents: [],
};

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
        let newUnassignedStudents = [...unassignedStudents];
        if (student.campusId === null)
          newUnassignedStudents = [...unassignedStudents, student];
        return {
          ...state,
          students: [...students, student],
          unassignedStudents: [...newUnassignedStudents],
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
          students: [...students.filter((s) => s.id !== student.id)],
          unassignedStudents: [
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
        const { students, campuses, unassignedStudents } = state;

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
          unassignedStudents: [
            ...unassignedStudents.map((s) =>
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
export default reducer;
