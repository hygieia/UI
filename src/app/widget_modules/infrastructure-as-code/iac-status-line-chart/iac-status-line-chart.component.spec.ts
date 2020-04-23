import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidStatusBarChartComponent } from './covid-status-bar-chart.component';

describe('CovidStatusBarChartComponent', () => {
  let component: CovidStatusBarChartComponent;
  let fixture: ComponentFixture<CovidStatusBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidStatusBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidStatusBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
