import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSidebarComponent } from './create-sidebar.component';

describe('CreateSidebarComponent', () => {
  let component: CreateSidebarComponent;
  let fixture: ComponentFixture<CreateSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
