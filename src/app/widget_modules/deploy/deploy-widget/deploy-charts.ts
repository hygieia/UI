import { ClickListComponent } from 'src/app/shared/charts/click-list/click-list.component';
import { IChart } from 'src/app/shared/interfaces';
//import {DEPLOY_CHARTS} from 'src/app/widget_modules/deploy/deploy-widget/deploy-charts';


export let DEPLOY_CHARTS: IChart[] = 
[
    {
        title: 'Deploy',
        component: ClickListComponent,
        data: [],
        xAxisLabel: '',
        yAxisLabel: '',
        colorScheme: {}
      },
]