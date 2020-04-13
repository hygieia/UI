import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidAdvPieChartComponent } from './covid-adv-pie-chart.component';

describe('CovidAdvPieChartComponent', () => {
  let component: CovidAdvPieChartComponent;
  let fixture: ComponentFixture<CovidAdvPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidAdvPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidAdvPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
