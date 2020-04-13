import { Type } from '@angular/core';

export interface IGaugeChartData {
  dataPoints: any;
  min: number;
  max: number;
  units: string;
  linearGauge: boolean;
}
