import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvalidComponent } from './create-invalid.component';

describe('CreateInvalidComponent', () => {
  let component: CreateInvalidComponent;
  let fixture: ComponentFixture<CreateInvalidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInvalidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
