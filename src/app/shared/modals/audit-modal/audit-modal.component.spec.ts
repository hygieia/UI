import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditModalComponent } from './audit-modal.component';

describe('AuditModalComponent', () => {
  let component: AuditModalComponent;
  let fixture: ComponentFixture<AuditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
