import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminsComponent } from './manage-admins.component';

describe('ManageAdminsComponent', () => {
  let component: ManageAdminsComponent;
  let fixture: ComponentFixture<ManageAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
