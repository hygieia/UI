import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxUIModule } from '@swimlane/ngx-ui';
import { TimeAgoPipe } from 'time-ago-pipe';

import { CaponeTemplateComponent } from '../screen_modules/team-dashboard/capone-template/capone-template.component';
import { BuildConfigFormComponent } from '../widget_modules/build/build-config-form/build-config-form.component';
import { BuildDetailComponent } from '../widget_modules/build/build-detail/build-detail.component';
import { BuildWidgetComponent } from '../widget_modules/build/build-widget/build-widget.component';
import { ChartDirective } from './charts/chart.directive';
import { ChartComponent } from './charts/chart/chart.component';
import { ClickListComponent } from './charts/click-list/click-list.component';
import { ComboChartComponent } from './charts/combo-chart/combo-chart.component';
import { ComboSeriesVerticalComponent } from './charts/combo-series-vertical/combo-series-vertical.component';
import { GaugeChartComponent } from './charts/gauge-chart/gauge-chart.component';
import { LineAndBarChartComponent } from './ngx-charts/line-and-bar-chart/line-and-bar-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { NumberCardChartComponent } from './charts/number-card-chart/number-card-chart.component';
import { PlainTextChartComponent } from './charts/plain-text-chart/plain-text-chart.component';
import { DashStatusComponent } from './dash-status/dash-status.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutDirective } from './layouts/layout.directive';
import { LayoutComponent } from './layouts/layout/layout.component';
import { TwoByTwoLayoutComponent } from './layouts/two-by-two-layout/two-by-two-layout.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { DetailModalComponent } from './modals/detail-modal/detail-modal.component';
import { DetailModalDirective } from './modals/detail-modal/detail-modal.directive';
import { FormModalComponent } from './modals/form-modal/form-modal.component';
import { FormModalDirective } from './modals/form-modal/form-modal.directive';
import { PaginationComponent } from './pagination/pagination.component';
import { MinutesPipe } from './pipes/minutes.pipe';
import { BaseTemplateComponent } from './templates/base-template/base-template.component';
import { TemplatesDirective } from './templates/templates.directive';
import { WidgetHeaderComponent } from './widget-header/widget-header.component';
import { PlaceholderWidgetComponent } from './widget/placeholder-widget/placeholder-widget.component';
import { WidgetComponent } from './widget/widget.component';
import { WidgetDirective } from './widget/widget.directive';
import { DeployWidgetComponent } from '../widget_modules/deploy/deploy-widget/deploy-widget.component';
import { DeployDetailComponent } from '../widget_modules/deploy/deploy-detail/deploy-detail.component';
import { OneChartLayoutComponent } from './layouts/one-chart-layout/one-chart-layout.component';
import { DeployConfigFormComponent } from '../widget_modules/deploy/deploy-config-form/deploy-config-form.component';
import { RepoConfigFormComponent } from '../widget_modules/repo/repo-config-form/repo-config-form.component';
import { RepoDetailComponent } from '../widget_modules/repo/repo-detail/repo-detail.component';
import { RepoWidgetComponent } from '../widget_modules/repo/repo-widget/repo-widget.component';
import { OneByTwoLayoutComponent } from './layouts/one-by-two-layout/one-by-two-layout.component';
import { FeatureConfigFormComponent } from '../widget_modules/feature/feature-config-form/feature-config-form.component';
import { FeatureWidgetComponent } from '../widget_modules/feature/feature-widget/feature-widget.component';
import {FeatureDetailComponent} from '../widget_modules/feature/feature-detail/feature-detail.component';
import {
  StaticAnalysisConfigFormComponent
} from '../widget_modules/static-analysis/static-anaylsis-config-form/static-analysis-config-form.component';
import {StaticAnalysisDetailComponent} from '../widget_modules/static-analysis/static-analysis-detail/static-analysis-detail.component';
import {StaticAnalysisWidgetComponent} from '../widget_modules/static-analysis/static-analysis-widget/static-analysis-widget.component';
import { HorizontalBarChartComponent } from './charts/horizontal-bar-chart/horizontal-bar-chart.component';
import {BarHorizontalComponent} from './ngx-charts/bar-horizontal/bar-horizontal.component';
import {PieGridChartComponent} from './charts/pie-grid-chart/pie-grid-chart.component';
import {PieGridComponent} from './ngx-charts/pie-grid/pie-grid.component';
import { IACConfigFormComponent } from '../widget_modules/infrastructure-as-code/iac-config-form/iac-config-form.component';
import { IACWidgetComponent } from '../widget_modules/infrastructure-as-code/iac-widget/iac-widget.component';
import { IACMasterComponent } from '../widget_modules/infrastructure-as-code/iac-master/iac-master.component';
import { IACCardComponent } from '../widget_modules/infrastructure-as-code/iac-card/iac-card.component';
import { IACStatusBarChartComponent } from '../widget_modules/infrastructure-as-code/iac-status-bar-chart/iac-status-bar-chart.component';
import { IACStatusLineChartComponent } from '../widget_modules/infrastructure-as-code/iac-status-line-chart/iac-status-line-chart.component';
import {DockerConfigFormComponent} from '../widget_modules/docker/docker-config-form/docker-config-form.component';
import {DockerWidgetComponent} from '../widget_modules/docker/docker-widget/docker-widget.component';
import {DockerDetailComponent} from '../widget_modules/docker/docker-detail/docker-detail.component';
@NgModule({
  declarations: [
    DeployConfigFormComponent,
    BarHorizontalComponent,
    BaseTemplateComponent,
    BuildConfigFormComponent,
    BuildDetailComponent,
    BuildWidgetComponent,
    CaponeTemplateComponent,
    ChartComponent,
    ChartDirective,
    ClickListComponent,
    ComboChartComponent,
    ComboSeriesVerticalComponent,
    ConfirmationModalComponent,
    DashboardComponent,
    DetailModalComponent,
    DetailModalDirective,
    FeatureConfigFormComponent,
    FeatureDetailComponent,
    FeatureWidgetComponent,
    FormModalComponent,
    FormModalDirective,
    HorizontalBarChartComponent,
    LayoutComponent,
    LayoutDirective,
    LineAndBarChartComponent,
    LineChartComponent,
    MinutesPipe,
    NumberCardChartComponent,
    OneByTwoLayoutComponent,
    PaginationComponent,
    PieGridComponent,
    PieGridChartComponent,
    PlaceholderWidgetComponent,
    RepoConfigFormComponent,
    RepoDetailComponent,
    RepoWidgetComponent,
    TemplatesDirective,
    TimeAgoPipe,
    TwoByTwoLayoutComponent,
    WidgetComponent,
    WidgetDirective,
    WidgetHeaderComponent,
    DashStatusComponent,
    PlainTextChartComponent,
    DeployDetailComponent,
    DeployWidgetComponent,
    OneChartLayoutComponent,
    GaugeChartComponent,
    StaticAnalysisConfigFormComponent,
    StaticAnalysisDetailComponent,
    StaticAnalysisWidgetComponent,
    	IACConfigFormComponent,
    IACWidgetComponent,
    	DockerConfigFormComponent,
    DockerWidgetComponent,
DockerDetailComponent,
    IACMasterComponent,
    IACCardComponent,
    IACStatusBarChartComponent,
    IACStatusLineChartComponent
  ],
  entryComponents: [
    DeployDetailComponent,
    DeployWidgetComponent,
    DeployConfigFormComponent,
    BarHorizontalComponent,
    BuildConfigFormComponent,
    BuildDetailComponent,
    BuildWidgetComponent,
    CaponeTemplateComponent,
    ClickListComponent,
    ComboChartComponent,
    ConfirmationModalComponent,
    DetailModalComponent,
    FeatureConfigFormComponent,
    FeatureDetailComponent,
    FeatureWidgetComponent,
    FormModalComponent,
    GaugeChartComponent,
    HorizontalBarChartComponent,
    LineAndBarChartComponent,
    LineChartComponent,
    NumberCardChartComponent,
    OneByTwoLayoutComponent,
    OneChartLayoutComponent,
    PieGridComponent,
    PieGridChartComponent,
    PlaceholderWidgetComponent,
    PlainTextChartComponent,
    RepoDetailComponent,
    RepoWidgetComponent,
    RepoConfigFormComponent,
    TwoByTwoLayoutComponent,
    StaticAnalysisConfigFormComponent,
    StaticAnalysisDetailComponent,
    StaticAnalysisWidgetComponent,
    	IACConfigFormComponent,
    IACWidgetComponent,
    	DockerConfigFormComponent,
DockerDetailComponent,
    DockerWidgetComponent,
    IACMasterComponent,
    IACCardComponent,
    IACStatusBarChartComponent,
    IACStatusLineChartComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FlexLayoutModule,
    NgbModule,
    NgxChartsModule,
    NgxUIModule,
    ReactiveFormsModule
  ],
  exports: [
    BarHorizontalComponent,
    BuildWidgetComponent,
    CaponeTemplateComponent,
    ChartComponent,
    ChartDirective,
    ComboChartComponent,
    ComboSeriesVerticalComponent,
    CommonModule,
    HorizontalBarChartComponent,
    LayoutComponent,
    LayoutDirective,
    LineAndBarChartComponent,
    LineChartComponent,
    NumberCardChartComponent,
    OneByTwoLayoutComponent,
    PaginationComponent,
    PieGridComponent,
    PieGridChartComponent,
    ReactiveFormsModule,
    TemplatesDirective,
    TwoByTwoLayoutComponent,
    WidgetComponent,
    WidgetDirective,
    WidgetHeaderComponent,
    GaugeChartComponent
  ]
})
export class SharedModule { }
