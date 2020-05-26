import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { IClickListData, IClickListItem } from 'src/app/shared/charts/click-list/click-list-interfaces';
import { DashStatus } from 'src/app/shared/dash-status/DashStatus';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { LayoutDirective } from 'src/app/shared/layouts/layout.directive';
import { TwoByTwoLayoutComponent } from 'src/app/shared/layouts/two-by-two-layout/two-by-two-layout.component';
import { WidgetComponent } from 'src/app/shared/widget/widget.component';
import { DockerDetailComponent } from '../docker-detail/docker-detail.component';
import { DockerService } from '../docker.service';
import { DOCKER_CHARTS } from './docker-charts';
import {OneChartLayoutComponent} from '../../../shared/layouts/one-chart-layout/one-chart-layout.component';

@Component({
  selector: 'app-docker-widget',
  templateUrl: './docker-widget.component.html',
  styleUrls: ['./docker-widget.component.sass']
})
export class DockerWidgetComponent extends WidgetComponent implements OnInit, AfterViewInit, OnDestroy{

 
  // Reference to the subscription used to refresh the widget
  // private intervalRefreshSubscription: Subscription;
  @ViewChild(LayoutDirective, {static: false}) childLayoutTag: LayoutDirective;
  private intervalRefreshSubscription: Subscription;

  constructor(componentFactoryResolver: ComponentFactoryResolver,
              cdr: ChangeDetectorRef,
              dashboardService: DashboardService,
              route: ActivatedRoute,
              private dockerService : DockerService
  ) {
    super(componentFactoryResolver, cdr, dashboardService, route);
 
  }

  ngOnInit() {
    this.widgetId = 'docker0';
    this.layout = OneChartLayoutComponent;
    this.charts = DOCKER_CHARTS;
    this.init();
  }

  ngAfterViewInit() {
    this.startRefreshInterval();
  }

  ngOnDestroy() {
    this.stopRefreshInterval();
  }

  startRefreshInterval() {
    this.dashboardService.dashboardConfig$.pipe(
      map(result => {
        const widget = this.findWidget(result.widgets);
        return widget;
      })
    ).subscribe(result => {
      if (result) {
        this.widgetConfigSubject.next(result);
      }
    });

    this.populateNumberCardCharts();

    super.loadComponent(this.childLayoutTag);
  }

  populateNumberCardCharts() {
	this.dockerService._GetDockerMetaCount().subscribe((result => {
		console.log(result);
    this.charts[0].data[0].value = 1;
    this.charts[0].data[1].value = 2;
    this.charts[0].data[2].value = 999;
		
	}));
	
	
  }

  stopRefreshInterval() {
    if (this.intervalRefreshSubscription) {
      this.intervalRefreshSubscription.unsubscribe();
    }
  }

}
