import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContainerComponent } from './create-container.component';

describe('CreateContainerComponent', () => {
  let component: CreateContainerComponent;
  let fixture: ComponentFixture<CreateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
