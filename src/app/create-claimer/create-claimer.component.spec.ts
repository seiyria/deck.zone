import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClaimerComponent } from './create-claimer.component';

describe('CreateClaimerComponent', () => {
  let component: CreateClaimerComponent;
  let fixture: ComponentFixture<CreateClaimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClaimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
