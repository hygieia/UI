import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidCardComponent } from './covid-card.component';

describe('CovidCardComponent', () => {
  let component: CovidCardComponent;
  let fixture: ComponentFixture<CovidCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
