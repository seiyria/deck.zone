import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResultsComponent } from './create-results.component';

describe('CreateResultsComponent', () => {
  let component: CreateResultsComponent;
  let fixture: ComponentFixture<CreateResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
