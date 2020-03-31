import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {forkJoin, of, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {IClickListData, IClickListItemFeature} from 'src/app/shared/charts/click-list/click-list-interfaces';
import {DashStatus} from 'src/app/shared/dash-status/DashStatus';
import {DashboardService} from 'src/app/shared/dashboard.service';
import {LayoutDirective} from 'src/app/shared/layouts/layout.directive';
import {TwoByTwoLayoutComponent} from 'src/app/shared/layouts/two-by-two-layout/two-by-two-layout.component';
import {WidgetComponent} from 'src/app/shared/widget/widget.component';
import {FeatureService} from '../feature.service';
import {IFeature} from '../interfaces';
import {FEATURE_CHARTS} from './feature-charts';
import {OneByTwoLayoutComponent} from '../../../shared/layouts/one-by-two-layout/one-by-two-layout.component';

@Component({
  selector: 'app-feature-widget',
  templateUrl: './feature-widget.component.html',
  styleUrls: ['./feature-widget.component.scss']
})
export class FeatureWidgetComponent extends WidgetComponent implements OnInit, AfterViewInit, OnDestroy {

  private featureTimeThreshold: number;
  // Default build time threshold
  private readonly BUILD_TIME_THRESHOLD = 900000;
  private params;

  // Reference to the subscription used to refresh the widget
  private intervalRefreshSubscription: Subscription;

  @ViewChild(LayoutDirective, {static: false}) childLayoutTag: LayoutDirective;

  constructor(componentFactoryResolver: ComponentFactoryResolver,
              cdr: ChangeDetectorRef,
              dashboardService: DashboardService,
              route: ActivatedRoute,
              private featureService: FeatureService) {
    super(componentFactoryResolver, cdr, dashboardService, route);
  }

  // Initialize the widget and set layout and charts.
  ngOnInit() {
    this.widgetId = 'feature0';
    this.layout = TwoByTwoLayoutComponent;
    // Chart configuration moved to external file
    this.charts = FEATURE_CHARTS;
    this.init();
  }

  // After the view is ready start the refresh interval.
  ngAfterViewInit() {
    this.startRefreshInterval();
  }

  ngOnDestroy() {
    this.stopRefreshInterval();
  }

  // Start a subscription to the widget configuration for this widget and refresh the graphs each
  // cycle.
  startRefreshInterval() {
    this.intervalRefreshSubscription = this.dashboardService.dashboardRefresh$.pipe(
      startWith(-1), // Refresh this widget seperate from dashboard (ex. config is updated)
      distinctUntilChanged(), // If dashboard is loaded the first time, ignore widget double refresh
      switchMap(_ => this.getCurrentWidgetConfig()),
      switchMap(widgetConfig => {
        if (!widgetConfig) {
          return of([]);
        }
        // sprintType: kanban or scrum
        // teamName: "Hygieia Standup Board"
        // sprintType: "kanban"
        // teamId: "27480"
        // featureTool: "Jira"
        // showStatus: {kanban: true, scrum: false}
        // id: "feature0"
        // projectName: "Pipeline ART"
        // projectId: "138300"
        // estimateMetricType: "storypoints"
        // listType: "epics"
        this.params = {
          id: widgetConfig.options.id,
          featureTool: widgetConfig.options.featureTool,
          teamName: widgetConfig.options.teamName,
          projectName: widgetConfig.options.projectName,
          componentId: widgetConfig.componentId,
          filterTeamId: widgetConfig.options.teamId,
          filterProjectId: widgetConfig.options.projectId,
          agileType: widgetConfig.options.sprintType,
          listType: widgetConfig.options.listType,
          estimateMetricType: widgetConfig.options.estimateMetricType
        };
        // Part 1 of Feature widget (Title, Project name, and Team name)
        // const featureData = {
        //   status: DashStatus.PASS,
        //   statusText: '',
        //   title: this.params.featureTool,
        //   subtitles: [],
        //   projectName: this.params.projectName,
        //   teamName: this.params.teamName,
        // } as IClickListItemFeature;
        //
        // this.charts[0].data = {
        //   items: featureData,
        //   clickableContent: null,
        //   clickableHeader: null
        // } as IClickListData;

        console.log(widgetConfig);

        //return this.featureService.fetchSprint(this.params.componentId, this.params.filterTeamId, this.params.filterProjectId, this.params.agileType);
        return forkJoin(
          this.featureService.fetchSprint(this.params.componentId, this.params.filterTeamId).pipe(catchError(err => of(err))),
          this.featureService.fetchFeatureWip(this.params.componentId, this.params.filterTeamId, this.params.filterProjectId, this.params.estimateMetricType, this.params.agileType).pipe(catchError(err => of(err))),
          this.featureService.fetchAggregateSprintEstimates(this.params.componentId, this.params.filterTeamId, this.params.filterProjectId, this.params.estimateMetricType, this.params.agileType).pipe(catchError(err => of(err))));
      })).subscribe(([sprint, wip, estimates]) => {
        // Call methods here to play with data
        console.log(sprint);
        console.log(wip);
        console.log(estimates);

        super.loadComponent(this.childLayoutTag);
      });
  }

  // Unsubscribe from the widget refresh observable, which stops widget updating.
  stopRefreshInterval() {
    if (this.intervalRefreshSubscription) {
      this.intervalRefreshSubscription.unsubscribe();
    }
  }

  // *********************** MAIN DETAILS *****************************
  // private generateTitleDetails(result: IFeature[]) {
  //   const featureData = {
  //     status: deployStatus,
  //     statusText: deployStatusText,
  //     title: this.params.,
  //     subtitles: [],
  //     projectName: ,
  //     teamName: ,
  //   } as IClickListItemFeature;
  //
  // }

  // *********************** ITERATION SUMMARY ************************

  // featureSprintDetailRoute from feature service.
  private generateIterationSummary(result: IFeature[]) {
    // const openCount = result.filter(build => this.checkBuildAfterDate(build, today)).length;
    // const wipCount = result.filter(build => this.checkBuildAfterDate(build, bucketOneStartDate)).length;

    // this.charts[3].data[0].value = openCount;
    // this.charts[3].data[1].value = wipCount;
  }

  //// *********************** HELPER UTILS *********************

  // private checkFeatureStatus(feature: IFeature, status: string): boolean {
  //   return build.buildStatus === status;
  // }
}
