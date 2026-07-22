import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollment-form',
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrls: ['./reactive-enrollment-form.component.css']
})
export class ReactiveEnrollmentFormComponent implements OnInit {
  enrollForm: FormGroup;
  submitted = false;
  formValue: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [this.simulateEmailCheck.bind(this)]],
      courseId: ['', [Validators.required, this.noCourseCodeValidator]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });

    // Note: enrollForm.value excludes disabled controls, enrollForm.getRawValue() includes all controls
  }

  // Custom synchronous validator
  noCourseCodeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.startsWith('XX')) {
      return { noCourseCode: true };
    }
    return null;
  }

  // Custom async validator
  simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const value = control.value;
        if (value && value.includes('test@')) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }
      }, 800);
    });
  }

  get studentNameCtrl() {
    return this.enrollForm.get('studentName');
  }

  get emailCtrl() {
    return this.enrollForm.get('studentEmail');
  }

  get courseIdCtrl() {
    return this.enrollForm.get('courseId');
  }

  get additionalCourses() {
    return this.enrollForm.get('additionalCourses') as any;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    this.formValue = this.enrollForm.value;
    console.log('Form value:', this.enrollForm.value);
    console.log('Form raw value:', this.enrollForm.getRawValue());
    this.submitted = true;
  }

  resetForm(): void {
    this.enrollForm.reset();
    this.submitted = false;
  }
}