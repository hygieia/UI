import { ClickListComponent } from 'src/app/shared/charts/click-list/click-list.component';
import { IChart } from 'src/app/shared/interfaces';
import { CodeProgressComponent } from '../code-progress-table/code-progress.component'

export let CODEPROGRESS_CHARTS: IChart[] = [
  // {
  //   title: 'Last 10 Deployments',
  //   component: ClickListComponent,
  //   data: [],
  //   xAxisLabel: '',
  //   yAxisLabel: '',
  //   colorScheme: {}
  // },
  {
    title: 'Code Progress',
    component: CodeProgressComponent,
    data: [],
    xAxisLabel: '',
    yAxisLabel: '',
    colorScheme: {}
  }
];
