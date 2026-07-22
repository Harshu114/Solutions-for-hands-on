import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Course } from '../../app.module';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  template: `
    <div class="course-card" [appHighlightPassed]="course?.gradeStatus || ''">
      <h3>{{ course?.name }}</h3>
      <p class="code">{{ course?.code }}</p>
      <p class="credits">Credits: {{ course?.credits }}</p>
      <p class="description">{{ course?.description }}</p>
      <span *ngIf="course?.gradeStatus" [ngClass]="course?.gradeStatus">
        {{ course?.gradeStatus | titlecase }}
      </span>
      <span *ngIf="course?.credits" appDuration>{{ course?.credits | duration }}</span>
      <button *ngIf="showActions" (click)="toggleEnroll()">
        {{ enrollmentService.isEnrolled(course.id) ? 'Unenroll' : 'Enroll' }}
      </button>
    </div>
  `,
  styles: [`
    .course-card {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .course-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      transform: translateY(-2px);
      transition: all 0.3s;
    }
    .code {
      color: #666;
      font-family: monospace;
    }
    .credits {
      font-weight: bold;
      color: #2c3e50;
    }
    .description {
      color: #555;
      font-size: 0.9rem;
    }
    .passed {
      color: green;
      font-weight: bold;
    }
    .failed {
      color: red;
      font-weight: bold;
    }
    .in-progress {
      color: orange;
      font-weight: bold;
    }
    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #2980b9;
    }
  `]
})
export class CourseCardComponent implements OnChanges {
  @Input() course: Course;
  @Input() showActions = false;

  constructor(public enrollmentService: EnrollmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CourseCardComponent - ngOnChanges:', changes);
  }

  toggleEnroll(): void {
    if (this.enrollmentService.isEnrolled(this.course.id)) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
  }
}