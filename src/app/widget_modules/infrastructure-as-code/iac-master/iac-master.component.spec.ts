import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IacMasterComponent } from './iac-master.component';

describe('IacMasterComponent', () => {
  let component: IacMasterComponent;
  let fixture: ComponentFixture<IacMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IacMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IacMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
