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
import {
  IClickListData,
  IClickListItem, IClickListItemFeature
} from 'src/app/shared/charts/click-list/click-list-interfaces';
import {DashboardService} from 'src/app/shared/dashboard.service';
import {LayoutDirective} from 'src/app/shared/layouts/layout.directive';
import {TwoByTwoLayoutComponent} from 'src/app/shared/layouts/two-by-two-layout/two-by-two-layout.component';
import {WidgetComponent} from 'src/app/shared/widget/widget.component';
import {FeatureService} from '../feature.service';
import {IFeature} from '../interfaces';
import {FEATURE_CHARTS} from './feature-charts';
import {FeatureDetailComponent} from '../feature-detail/feature-detail.component';

@Component({
  selector: 'app-feature-widget',
  templateUrl: './feature-widget.component.html',
  styleUrls: ['./feature-widget.component.scss']
})
export class FeatureWidgetComponent extends WidgetComponent implements OnInit, AfterViewInit, OnDestroy {

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

        // TODO: DELETE LATER
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
          component: widgetConfig.componentId,
          teamId: widgetConfig.options.teamId,
          projectId: widgetConfig.options.projectId,
          agileType: widgetConfig.options.sprintType,
          listType: widgetConfig.options.listType,
          estimateMetricType: widgetConfig.options.estimateMetricType
        };

        let items: IClickListItem[]= [];
        items[0] = {
          title: 'Feature Tool: ' + this.params.featureTool
        } as IClickListItem;

        items[1] = {
          title: 'Project Name: ' + this.params.projectName
        } as IClickListItem;

        items[2] = {
          title: 'Team Name: ' + this.params.teamName
        } as IClickListItem;

        // Part 1 of Feature widget (Title, Project name, and Team name)
        this.charts[0].data = {
          items: items,
          clickableContent: null,
          clickableHeader: null
        } as IClickListData;

        //return this.featureService.fetchSprint(this.params.componentId, this.params.filterTeamId, this.params.filterProjectId, this.params.agileType);
        return forkJoin(
          this.featureService.fetchFeatureWip(this.params.component, this.params.teamId, this.params.projectId, this.params.estimateMetricType, this.params.agileType).pipe(catchError(err => of(err))),
          this.featureService.fetchAggregateSprintEstimates(this.params.component, this.params.teamId, this.params.projectId, this.params.estimateMetricType, this.params.agileType).pipe(catchError(err => of(err))));
      })).subscribe(([wip, estimates]) => {
        if (this.params.listType === 'epics') {
          this.processFeatureWipResponse(wip as IClickListItem, 'epics');
        } else {
          this.processFeatureWipResponse(wip as IClickListItem, 'issues');
        }
        this.generateIterationSummary(estimates);

        super.loadComponent(this.childLayoutTag);
      });
  }

  // Unsubscribe from the widget refresh observable, which stops widget updating.
  stopRefreshInterval() {
    if (this.intervalRefreshSubscription) {
      this.intervalRefreshSubscription.unsubscribe();
    }
  }

  // *********************** ITERATION SUMMARY ************************

  // Displays Sprint information for Open, WIP, Done
  private generateIterationSummary(result: IFeature) {
    this.charts[1].data[0].value = result.openEstimate;
    this.charts[1].data[1].value = result.inProgressEstimate;
    this.charts[1].data[2].value = result.completeEstimate;
  }

  // **************************** EPICS/ISSUES *******************************

  private processFeatureWipResponse(data, issueOrEpic: string) {
    let issueOrEpicCollection: IClickListItemFeature[] = [];

    data.forEach(curr => {
      issueOrEpicCollection.push(curr);
    });

    const items = issueOrEpicCollection.map(curr => {
      if (issueOrEpic === 'epics') {
        return {
          title: curr.sEpicName,
          name: curr.sEpicName,
          url: curr.sEpicUrl,
          number: curr.sEpicNumber,
          type: 'Epic',
          time: curr.sEstimate
        } as IClickListItemFeature;
      } else {
        return {
          title: curr.sName,
          name: curr.sName,
          url: curr.sUrl,
          number: curr.sNumber,
          type: 'Issue',
          time: curr.sEstimate
        } as IClickListItemFeature;
      }
    });

    this.charts[2].data = {
      items: items,
      clickableContent: FeatureDetailComponent,
      clickableHeader: null
    } as IClickListData;
  }
}
