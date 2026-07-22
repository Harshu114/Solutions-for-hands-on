import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../app.module';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, description: 'Test course 1' },
    { id: 2, name: 'Algorithms', code: 'CS201', credits: 4, description: 'Test course 2' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test 107: Test getCourses()
  it('should retrieve courses from the API via GET', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  // Test 108: Test error handling
  it('should handle 500 error response', () => {
    service.getCourses().subscribe({
      next: () => fail('Expected an error, not courses'),
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush('Internal Server Error', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });

  // Test for deleteCourse
  it('should send DELETE request for course deletion', () => {
    service.deleteCourse(1).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  // Test for addCourse
  it('should send POST request to add a course', () => {
    const newCourse: Course = { id: 3, name: 'New Course', code: 'CS301', credits: 3, description: 'A new course' };

    service.addCourse(newCourse).subscribe(course => {
      expect(course).toEqual(newCourse);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(newCourse);
  });
});