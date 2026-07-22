import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { EnrollmentFormComponent } from './pages/enrollment-form/enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from './pages/reactive-enrollment-form/reactive-enrollment-form.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { DurationPipe } from './pipes/duration.pipe';
import { HighlightPassedDirective } from './directives/highlight-passed.directive';
import { DurationAttributeDirective } from './directives/duration-attribute.directive';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/logging.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { AuthGuard } from './guards/auth.guard';

// NgRx imports
import { courseReducer } from './store/course.reducer';
import { CourseEffects } from './store/course.effects';

// Models
export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  description: string;
  gradeStatus?: 'passed' | 'failed' | 'in-progress';
}

export interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
  year: number;
}

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'enroll', component: EnrollmentFormComponent },
  { path: 'enroll-reactive', component: ReactiveEnrollmentFormComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],      // Route guard (requirement 75-77)
    data: { role: 'admin' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CoursesComponent,
    EnrollmentFormComponent,
    ReactiveEnrollmentFormComponent,
    AdminComponent,
    CourseCardComponent,
    DurationPipe,
    HighlightPassedDirective,
    DurationAttributeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ course: courseReducer }),
    EffectsModule.forRoot([CourseEffects])
  ],
  providers: [
    // Interceptors run in registration order: auth → loading → error handler
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
    // AuthGuard, LoadingService, EnrollmentService, CourseService are providedIn: 'root'
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}