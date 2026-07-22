import { createAction, props } from '@ngrx/store';
import { Course } from '../app.module';

export const loadCourses = createAction('[Course] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);

export const enrollCourse = createAction(
  '[Course] Enroll Course',
  props<{ courseId: number }>()
);

export const enrollCourseSuccess = createAction(
  '[Course] Enroll Course Success',
  props<{ courseId: number }>()
);

export const enrollCourseFailure = createAction(
  '[Course] Enroll Course Failure',
  props<{ error: string }>()
);