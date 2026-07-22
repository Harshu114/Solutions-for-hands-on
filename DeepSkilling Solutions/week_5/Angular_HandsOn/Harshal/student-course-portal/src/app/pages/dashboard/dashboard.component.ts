import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Hands-On 2, Task 1: All four binding types
  portalName = 'Student Course Portal';
  isPortalActive = true;
  searchTerm = '';
  message = '';

  // Student profile data
  student = {
    name: 'John Doe',
    email: 'john.doe@student.edu',
    major: 'Computer Science',
    year: 3
  };

  // For Hands-On 2, Task 2: ngOnChanges demo via CourseCard
  recentCourses = [
    { id: 1, name: 'Mathematics I', code: 'MATH101', credits: 4 },
    { id: 2, name: 'Physics I', code: 'PHYS101', credits: 3 }
  ];

  constructor() {
    console.log('DashboardComponent constructor called');
  }

  ngOnInit(): void {
    // Hands-On 2, Task 2: Lifecycle hook — fires after component initialization
    console.log('HomeComponent initialised — courses loaded');
  }

  // Hands-On 2, Task 1: Event binding method
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
    console.log(this.message);
  }

  ngOnDestroy(): void {
    // Hands-On 2, Task 2: Cleanup when component is destroyed
    console.log('HomeComponent destroyed');
  }

  onEnroll(courseId: number): void {
    console.log('Enroll requested for course:', courseId);
  }
}