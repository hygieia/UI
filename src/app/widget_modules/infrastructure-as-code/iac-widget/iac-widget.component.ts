import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ComponentFactoryResolver,
	OnDestroy,
	OnInit,
	ViewChild,
	Input,
	Output,
	EventEmitter,
	TemplateRef,
    Type
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Observable, of, Subscription, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { sequenceEqual, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, startWith,  take } from 'rxjs/operators';
import { IClickListData, IClickListItem } from 'src/app/shared/charts/click-list/click-list-interfaces'; ``
import { DashStatus } from 'src/app/shared/dash-status/DashStatus';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { LayoutDirective } from 'src/app/shared/layouts/layout.directive';
import { TwoByTwoLayoutComponent } from 'src/app/shared/layouts/two-by-two-layout/two-by-two-layout.component';
import { WidgetComponent } from 'src/app/shared/widget/widget.component';

import { CollectorService } from 'src/app/shared/collector.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { IACService } from '../iac.service';
import { IACCardComponent } from '../iac-card/iac-card.component';
import { IACStatusBarChartComponent } from '../iac-status-bar-chart/iac-status-bar-chart.component';
import { IACStatusLineChartComponent } from '../iac-status-line-chart/iac-status-line-chart.component';
import {OneChartLayoutComponent} from '../../../shared/layouts/one-chart-layout/one-chart-layout.component';

@Component({
	selector: 'app-iac-widget',
	templateUrl: './iac-widget.component.html',
	styleUrls: ['./iac-widget.component.scss']
})
export class IACWidgetComponent extends WidgetComponent implements OnInit, AfterViewInit, OnDestroy {

// make it complex and framwowrk oriebnted but one at a time, take one nesting or coplexity at a time
 

  // Reference to the subscription used to refresh the widget
  private intervalRefreshSubscription: Subscription;
  @ViewChild(LayoutDirective, {static: false}) childLayoutTag: LayoutDirective;

ngOnInit(){
	 this.widgetId = 'repo0';
    this.layout = OneChartLayoutComponent;
    this.init();
}

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
	
 // Take one dashboard config from the dashboard service.
  // Load dashboard will initiate the http request that
  // this subscription will receive. The dashboard config
  // is filtered for this widget and pushed to the local
  // config subject.
  init(): void {
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
  }	



ngOnDestroy(){
	this.stopRefreshInterval();
}

ngAfterViewInit(){
	this.startRefreshInterval();
}


startRefreshInterval(){

}
 

stopRefreshInterval(){
	console.log("refresh");
	
}





	

}


