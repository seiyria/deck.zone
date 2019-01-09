import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCreatorComponent } from './create-creator.component';

describe('CreateCreatorComponent', () => {
  let component: CreateCreatorComponent;
  let fixture: ComponentFixture<CreateCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
