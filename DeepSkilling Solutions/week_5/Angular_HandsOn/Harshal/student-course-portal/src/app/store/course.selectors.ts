import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Course, CourseState } from '../app.module';

export const selectCourseState = createFeatureSelector<CourseState>('course');

export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.courses
);

export const selectCourseLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state.loading
);

export const selectCourseError = createSelector(
  selectCourseState,
  (state: CourseState) => state.error
);

export const selectCourseById = (courseId: number) =>
  createSelector(
    selectAllCourses,
    (courses: Course[]) => courses.find(course => course.id === courseId)
  );