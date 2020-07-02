import { ClickListComponent } from 'src/app/shared/charts/click-list/click-list.component';
import { IChart } from 'src/app/shared/interfaces';
import {RotationChartComponent} from '../../../shared/charts/rotation/rotation-chart.component';

export let FEATURE_CHARTS: IChart[] = [
  {
    title: 'Project Details',
    component: ClickListComponent,
    data: [],
    xAxisLabel: '',
    yAxisLabel: '',
    colorScheme: {}
  },
  {
    title: 'Iteration Summary',
    component: RotationChartComponent,
    data: [],
    xAxisLabel: '',
    yAxisLabel: '',
    colorScheme: {}
  }
  // {
  //   title: 'Epics/Issues in Progress and Points',
  //   component: ClickListComponent,
  //   data: [],
  //   xAxisLabel: '',
  //   yAxisLabel: '',
  //   colorScheme: {}
  // },
];
