import { ClickListComponent } from 'src/app/shared/charts/click-list/click-list.component';
import { ComboChartComponent } from 'src/app/shared/charts/combo-chart/combo-chart.component';
import { ILineChartData } from 'src/app/shared/charts/line-chart/line-chart-interfaces';
import { LineChartComponent } from 'src/app/shared/charts/line-chart/line-chart.component';
import { NumberCardChartComponent } from 'src/app/shared/charts/number-card-chart/number-card-chart.component';
import { IChart } from 'src/app/shared/interfaces';


export let IAC_CHARTS: IChart[] = [
  
  {
    title: 'Total Builds',
    component: NumberCardChartComponent,
    data: [
      {
        name: 'Today',
        value: 0
      },
      {
        name: 'Last 7 Days',
        value: 0
      },
      {
        name: 'Last 14 Days',
        value: 0
      }
    ],
    xAxisLabel: '',
    yAxisLabel: '',
    colorScheme: 'vivid'
  },
];
