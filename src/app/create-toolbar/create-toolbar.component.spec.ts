import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToolbarComponent } from './create-toolbar.component';

describe('CreateToolbarComponent', () => {
  let component: CreateToolbarComponent;
  let fixture: ComponentFixture<CreateToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
