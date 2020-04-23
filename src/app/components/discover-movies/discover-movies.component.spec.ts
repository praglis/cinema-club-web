import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverMoviesComponent } from './discover-movies.component';

describe('DiscoverMoviesComponent', () => {
  let component: DiscoverMoviesComponent;
  let fixture: ComponentFixture<DiscoverMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
