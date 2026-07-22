import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  template: `
    <div class="enrollment-form-container">
      <h1>Student Enrollment Form</h1>
      
      <form #enrollForm="ngForm" (ngSubmit)="onSubmit(enrollForm)" class="enrollment-form">
        <div class="form-group">
          <label for="studentName">Student Name *</label>
          <input 
            type="text" 
            id="studentName" 
            name="studentName" 
            [(ngModel)]="studentName"
            #nameCtrl="ngModel"
            required 
            minlength="3"
            class="form-control">
          <span *ngIf="nameCtrl.touched && nameCtrl.errors?.['required']" class="error-msg">
            Name is required
          </span>
          <span *ngIf="nameCtrl.touched && nameCtrl.errors?.['minlength']" class="error-msg">
            Name must be at least 3 characters
          </span>
        </div>

        <div class="form-group">
          <label for="studentEmail">Email *</label>
          <input 
            type="email" 
            id="studentEmail" 
            name="studentEmail" 
            [(ngModel)]="studentEmail"
            #emailCtrl="ngModel"
            required
            email
            class="form-control">
          <span *ngIf="emailCtrl.touched && emailCtrl.errors?.['required']" class="error-msg">
            Email is required
          </span>
          <span *ngIf="emailCtrl.touched && emailCtrl.errors?.['email']" class="error-msg">
            Please enter a valid email
          </span>
        </div>

        <div class="form-group">
          <label for="courseId">Course ID *</label>
          <input 
            type="number" 
            id="courseId" 
            name="courseId" 
            [(ngModel)]="courseId"
            #courseIdCtrl="ngModel"
            required
            class="form-control">
          <span *ngIf="courseIdCtrl.touched && courseIdCtrl.errors?.['required']" class="error-msg">
            Course ID is required
          </span>
        </div>

        <div class="form-group">
          <label for="preferredSemester">Preferred Semester *</label>
          <select 
            id="preferredSemester" 
            name="preferredSemester" 
            [(ngModel)]="preferredSemester"
            #semesterCtrl="ngModel"
            required
            class="form-control">
            <option value="Odd">Odd Semester</option>
            <option value="Even">Even Semester</option>
          </select>
        </div>

        <div class="form-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="agreeToTerms" 
              [(ngModel)]="agreeToTerms"
              #termsCtrl="ngModel"
              required>
            I agree to the terms and conditions *
          </label>
          <span *ngIf="termsCtrl.touched && termsCtrl.errors?.['required']" class="error-msg">
            You must agree to terms
          </span>
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="enrollForm.invalid">Submit</button>
          <button type="button" (click)="resetForm(enrollForm)">Reset</button>
        </div>
      </form>

      <div *ngIf="submitted" class="success-msg">
        Enrollment request submitted successfully!
      </div>
    </div>
  `,
  styles: [`
    .enrollment-form-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 1rem;
    }
    .enrollment-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form-control {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .checkbox-group {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }
    .form-control.ng-invalid.ng-touched {
      border-color: red;
    }
    .form-control.ng-valid.ng-touched {
      border-color: green;
    }
    .error-msg {
      color: #e74c3c;
      font-size: 0.875rem;
    }
    .success-msg {
      margin-top: 1rem;
      padding: 1rem;
      background: #d4edda;
      color: #155724;
      border-radius: 4px;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    .form-actions button {
      padding: 0.75rem 1.5rem;
      cursor: pointer;
    }
    .form-actions button[type="submit"]:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class EnrollmentFormComponent {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;
  submitted = false;

  onSubmit(form: NgForm): void {
    console.log('Form value:', form.value);
    console.log('Form valid:', form.valid);
    this.submitted = true;
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.submitted = false;
  }
}