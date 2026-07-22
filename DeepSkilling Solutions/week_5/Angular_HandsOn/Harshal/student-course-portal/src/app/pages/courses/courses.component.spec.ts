import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { HighlightPassedDirective } from '../../directives/highlight-passed.directive';
import { CourseState } from '../../app.module';

describe('CoursesComponent with MockStore', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let store: MockStore;

  const mockCourses = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, description: 'Test' },
    { id: 2, name: 'Algorithms', code: 'CS201', credits: 4, description: 'Test' }
  ];

  const initialState: { course: CourseState } = {
    course: {
      courses: mockCourses,
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursesComponent,
        CourseCardComponent,
        DurationPipe,
        HighlightPassedDirective
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 109: Test component with initial state
  it('should render course cards from initial state', () => {
    const courseCards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(courseCards.length).toBe(2);
  });

  // Test 110: Test loading state
  it('should show loading indicator when loading is true', () => {
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null
      }
    });
    fixture.detectChanges();

    const loadingEl = fixture.debugElement.query(By.css('.loading'));
    expect(loadingEl).toBeTruthy();
    expect(loadingEl.nativeElement.textContent).toContain('Loading courses');
  });
});