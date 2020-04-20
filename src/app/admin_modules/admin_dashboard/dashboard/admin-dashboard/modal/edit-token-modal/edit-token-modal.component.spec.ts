import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTokenModalComponent } from './edit-token-modal.component';

describe('EditTokenModalComponent', () => {
  let component: EditTokenModalComponent;
  let fixture: ComponentFixture<EditTokenModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTokenModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTokenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
