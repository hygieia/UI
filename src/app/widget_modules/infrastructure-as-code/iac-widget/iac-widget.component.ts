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
import { Subscription} from 'rxjs';
import { FormBuilder} from '@angular/forms';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { LayoutDirective } from 'src/app/shared/layouts/layout.directive';
import { WidgetComponent } from 'src/app/shared/widget/widget.component';
import { CollectorService } from 'src/app/shared/collector.service';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { IACService } from '../iac.service';
import { IAC_CHARTS } from './iac-charts';
import {OneChartLayoutComponent} from '../../../shared/layouts/one-chart-layout/one-chart-layout.component';
import {map} from 'rxjs/operators';

@Component({
 selector: 'app-iac-widget',
 templateUrl: './iac-widget.component.html',
 styleUrls: ['./iac-widget.component.scss']
})
export class IACWidgetComponent extends WidgetComponent implements OnInit, AfterViewInit, OnDestroy {

  // Reference to the subscription used to refresh the widget
  // private intervalRefreshSubscription: Subscription;
  @ViewChild(LayoutDirective, {static: false}) childLayoutTag: LayoutDirective;
  private intervalRefreshSubscription: Subscription;

  constructor(componentFactoryResolver: ComponentFactoryResolver,
              cdr: ChangeDetectorRef,
              dashboardService: DashboardService,
              route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public collectorService: CollectorService,
              private iacService : IACService,
              config: NgbProgressbarConfig
  ) {
    super(componentFactoryResolver, cdr, dashboardService, route);

    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }

  ngOnInit() {
    this.widgetId = 'iac0';
    this.layout = OneChartLayoutComponent;
    this.charts = IAC_CHARTS;
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
    this.charts[0].data[0].value = 1;
    this.charts[0].data[1].value = 2;
    this.charts[0].data[2].value = 999;
  }

  stopRefreshInterval() {
    if (this.intervalRefreshSubscription) {
      this.intervalRefreshSubscription.unsubscribe();
    }
  }
}