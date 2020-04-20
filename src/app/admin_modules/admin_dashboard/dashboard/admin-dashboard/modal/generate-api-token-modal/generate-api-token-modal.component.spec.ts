import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateApiTokenModalComponent } from './generate-api-token-modal.component';

describe('GenerateApiTokenModalComponent', () => {
  let component: GenerateApiTokenModalComponent;
  let fixture: ComponentFixture<GenerateApiTokenModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateApiTokenModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateApiTokenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
