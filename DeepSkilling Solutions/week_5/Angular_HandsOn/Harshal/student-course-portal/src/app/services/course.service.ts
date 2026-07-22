import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Used by EnrollmentService to resolve IDs to full Course objects synchronously
  getCoursesSync(): Course[] {
    return [
      { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, description: 'Fundamental data structures and algorithms', gradeStatus: 'passed' },
      { id: 2, name: 'Algorithms', code: 'CS201', credits: 4, description: 'Advanced algorithm design and analysis', gradeStatus: 'in-progress' },
      { id: 3, name: 'Database Systems', code: 'CS301', credits: 3, description: 'Relational databases and SQL' },
      { id: 4, name: 'Operating Systems', code: 'CS401', credits: 3, description: 'Process management and memory allocation' },
      { id: 5, name: 'Computer Networks', code: 'CS501', credits: 3, description: 'Network protocols and architectures' }
    ];
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(this.handleError)
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError(this.handleError)
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}