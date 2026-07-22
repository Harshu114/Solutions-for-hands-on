import { createReducer, on } from '@ngrx/store';
import { CourseState } from '../app.module';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure, enrollCourseSuccess } from './course.actions';

export const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null
};

export const courseReducer = createReducer(
  initialState,
  on(loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null
  })),
  on(loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(enrollCourseSuccess, (state, { courseId }) => ({
    ...state,
    courses: state.courses.map(course =>
      course.id === courseId
        ? { ...course, gradeStatus: 'in-progress' }
        : course
    )
  }))
);