import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../app.module';

@Component({
  selector: 'app-admin',
  template: `
    <div class="admin-container">
      <h1>Admin Dashboard</h1>
      
      <div *ngIf="loading" class="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <h2>Course Management</h2>
      <table class="course-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Credits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let course of courses">
            <td>{{ course.id }}</td>
            <td>{{ course.name }}</td>
            <td>{{ course.code }}</td>
            <td>{{ course.credits }}</td>
            <td>
              <button (click)="deleteCourse(course.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .admin-container {
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
    .course-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    .course-table th, .course-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .course-table th {
      background: #f5f6fa;
    }
    button {
      padding: 0.5rem 1rem;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #c0392b;
    }
  `]
})
export class AdminComponent implements OnInit {
  courses: Course[] = [];
  loading = false;
  error: string | null = null;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.error = null;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load courses: ' + err.message;
        this.loading = false;
      }
    });
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(c => c.id !== id);
      },
      error: (err) => {
        this.error = 'Failed to delete course: ' + err.message;
      }
    });
  }
}