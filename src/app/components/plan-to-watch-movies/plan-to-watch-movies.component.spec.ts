import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanToWatchMoviesComponent } from './plan-to-watch-movies.component';

describe('PlanToWatchMoviesComponent', () => {
  let component: PlanToWatchMoviesComponent;
  let fixture: ComponentFixture<PlanToWatchMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanToWatchMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanToWatchMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
