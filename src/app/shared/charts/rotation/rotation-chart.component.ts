import {Component, ViewEncapsulation} from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DashStatus } from '../../dash-status/DashStatus';

@Component({
  selector: 'app-rotation-chart',
  templateUrl: './rotation-chart.component.html',
  styleUrls: ['./rotation-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RotationChartComponent extends ChartComponent {
  DashStatus: typeof DashStatus = DashStatus;

  constructor(private modalService: NgbModal) {
    super();
  }
}
