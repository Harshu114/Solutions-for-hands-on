import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { HighlightPassedDirective } from '../../directives/highlight-passed.directive';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        CourseCardComponent,
        DurationPipe,
        HighlightPassedDirective
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the student name', () => {
    const h2 = fixture.debugElement.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('John Doe');
  });
});