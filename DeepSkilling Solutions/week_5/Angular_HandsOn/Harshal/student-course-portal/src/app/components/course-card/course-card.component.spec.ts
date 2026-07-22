import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, SimpleChanges, SimpleChange } from '@angular/core';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../app.module';
import { DurationPipe } from '../../pipes/duration.pipe';
import { HighlightPassedDirective } from '../../directives/highlight-passed.directive';
import { EnrollmentService } from '../../services/enrollment.service';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let enrollmentService: jasmine.SpyObj<EnrollmentService>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    description: 'Fundamental data structures and algorithms',
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    const enrollmentSpy = jasmine.createSpyObj('EnrollmentService', ['isEnrolled', 'enroll', 'unenroll']);
    enrollmentSpy.isEnrolled.and.returnValue(false);

    await TestBed.configureTestingModule({
      declarations: [
        CourseCardComponent,
        DurationPipe,
        HighlightPassedDirective
      ],
      providers: [
        { provide: EnrollmentService, useValue: enrollmentSpy }
      ]
    }).compileComponents();

    enrollmentService = TestBed.inject(EnrollmentService) as jasmine.SpyObj<EnrollmentService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  // Test 102: Verify the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 103: Test @Input rendering
  it('should display the course name in the template', () => {
    const h3Element = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3Element.textContent).toContain('Data Structures');
  });

  // Test updated: Test EnrollmentService-based toggleEnroll
  it('should toggle enrollment via EnrollmentService', () => {
    enrollmentService.isEnrolled.and.returnValue(true);
    component.toggleEnroll();
    expect(enrollmentService.unenroll).toHaveBeenCalledWith(1);
  });

  it('should call enroll when not already enrolled', () => {
    enrollmentService.isEnrolled.and.returnValue(false);
    component.toggleEnroll();
    expect(enrollmentService.enroll).toHaveBeenCalledWith(1);
  });

  // Test 105: Test ngOnChanges
  it('should log on ngOnChanges', () => {
    spyOn(console, 'log');

    const changes: SimpleChanges = {
      course: new SimpleChange(null, mockCourse, true)
    };
    component.ngOnChanges(changes);

    expect(console.log).toHaveBeenCalledWith(
      'CourseCardComponent - ngOnChanges:',
      changes
    );
  });
});