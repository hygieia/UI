import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmModalComponent } from './delete-confirm-modal.component';

describe('DeleteConfirmModalComponent', () => {
  let component: DeleteConfirmModalComponent;
  let fixture: ComponentFixture<DeleteConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
