import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCourses } from '../../store/course.actions';
import { Course, CourseState } from '../../app.module';

@Component({
  selector: 'app-courses',
  template: `
    <div class="courses-container">
      <h1>Available Courses</h1>
      
      <div *ngIf="loading$ | async" class="loading">Loading courses...</div>
      <div *ngIf="error$ | async as error" class="error">{{ error }}</div>
      
      <div class="course-grid" *ngIf="courses$ | async as courses">
        <app-course-card 
          *ngFor="let course of courses" 
          [course]="course"
          [showActions]="true"
          (enrollRequested)="onEnroll($event)">
        </app-course-card>
      </div>
      
      <div *ngIf="(courses$ | async)?.length === 0" class="no-courses">
        No courses available.
      </div>
    </div>
  `,
  styles: [`
    .courses-container {
      padding: 1rem;
    }
    .loading {
      font-size: 1.2rem;
      color: #3498db;
    }
    .error {
      color: #e74c3c;
      padding: 1rem;
      background: #ffeaa7;
      border-radius: 4px;
    }
    .course-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .no-courses {
      padding: 2rem;
      text-align: center;
      color: #666;
    }
  `]
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> = this.store.select((state: { course: CourseState }) => state.course.courses);
  loading$: Observable<boolean> = this.store.select((state: { course: CourseState }) => state.course.loading);
  error$: Observable<string | null> = this.store.select((state: { course: CourseState }) => state.course.error);

  constructor(private store: Store<{ course: CourseState }>) {}

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
  }

  onEnroll(courseId: number): void {
    console.log('Enroll requested for course:', courseId);
  }
}