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
import { of, Subscription, from } from 'rxjs';
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
import { OneChartLayoutComponent } from '../../../shared/layouts/one-chart-layout/one-chart-layout.component';
import { IClickListDockerVolumeItem, IClickListDockerContainerItem, IClickListDockerNodeItem, IClickListDockerNetworkItem, IClickListDockerProcessesItem } from '../docker-detail/IClickListDockerItem';

@Component({
	selector: 'app-docker-widget',
	templateUrl: './docker-widget.component.html',
	styleUrls: ['./docker-widget.component.sass']
})
export class DockerWidgetComponent extends WidgetComponent implements OnInit, AfterViewInit, OnDestroy {


	// Reference to the subscription used to refresh the widget
	// private intervalRefreshSubscription: Subscription;
	@ViewChild(LayoutDirective, { static: false }) childLayoutTag: LayoutDirective;
	private intervalRefreshSubscription: Subscription;

	constructor(componentFactoryResolver: ComponentFactoryResolver,
		cdr: ChangeDetectorRef,
		dashboardService: DashboardService,
		route: ActivatedRoute,
		private dockerService: DockerService
	) {
		super(componentFactoryResolver, cdr, dashboardService, route);

	}

	ngOnInit() {
		this.widgetId = 'docker0';
		this.layout = TwoByTwoLayoutComponent;
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
		this.populateMetaData();
		this.populateCPUStats();
		this.load();
	}

	load() {
		super.loadComponent(this.childLayoutTag);
	}


	populateNumberCardCharts() {
		this.charts[1].data = [];
		this.dockerService._GetDockerMetaCount().subscribe((result => {
			console.log(result);
			result = result.data;
			from(result).subscribe(result => {
				console.log(result);
				console.log(this)
				this.charts[1].data.push(result);
			});

		}), err => console.log('HTTP Error', err),
			() => this.load());
	}


	populateMetaData() {


		this.dockerService._GetDockerMetaData().subscribe((result => {
			console.log(result);
			let data;
			result = result.data;
			let i = 2;
			
				data = result['containers'];
				
				let conitems = [];
				
				from(data).subscribe(data => {

							let obj = 	{
						status: DashStatus.PASS,
						statusText: data['status'],
						title: 'Container(' + data['status'] + ')',
						subtitles:null,
						
						'containerId': data['containerId'],
						'names': null,
						'image': data['image'],
						'created': new Date(data['created']),
						'state': data['containerId'],
						'current_status': data['containerId'],
						/*'bridge': data['bridge'],*/
						'mounts': data['mount'],
						'processes': null,
						'imageId': data['containerId']
						
					}  as IClickListDockerContainerItem;

				conitems.push(obj);					
					
				})

				this.charts[0].data = {'items' : conitems, clickableContent: DockerDetailComponent,  clickableHeader: null} as IClickListData;
				
				i++;
				// Containers End 
				 
			
			data = result['volumes'];
				
				let volitems = [];
				from(data).subscribe(data => {
					
							let obj = 	{
						status: DashStatus.PASS,
						statusText: data['name'],
						title: 'Volume (' + data['scope'] + ')',
						subtitles: [],
						url: '',
						'mountpoint':  data['mountpoint'],
						'name': data['name'],
						'scope': data['scope'],
						'driver': data['driver'],
						'createdAt': new Date(data['createdAt'])
					} as IClickListDockerVolumeItem;;

				volitems.push(obj);					
					
				})

				this.charts[1].data = {'items' : volitems, clickableContent: DockerDetailComponent,  clickableHeader: null} as IClickListData;
				
				i++;
				// Volumes End 
				
				
			
			data = result['networks'];
				
				let netitems = [];
				from(data).subscribe(data => {
							let obj = 	{
						status: DashStatus.PASS,
						statusText: data['name'],
						title: 'Network (' + data['ingress'] + ')',
						subtitles: [],
						url: '',
						'name': data['networkId'],
						'networkId': data['networkId'],
						'created': new Date(data['created']),
						'scope': data['scope'],
						'attachable': data['attachable'],
						'ingress': data['ingress'],
						'driver': data['driver']
					} as IClickListDockerNetworkItem;;

				netitems.push(obj);					
					
				})

				this.charts[2].data = {'items' : netitems, clickableContent: DockerDetailComponent,  clickableHeader: null} as IClickListData;
				
			
			data = result['processes'];
				
				let processitems = [];
				from(data).subscribe(data => {
							let obj = 	{
						status: DashStatus.PASS,
						statusText: data['name'],
						title: 'Process@ ( Container-1)',
						subtitles: [],
						url: '',
						'containerId': data['containerId'] ,
						'processes': data['processes'],
						'titles': data['titles']
					} as IClickListDockerProcessesItem;;

				processitems.push(obj);					
					
				})

				this.charts[3].data = {'items' : processitems, clickableContent: DockerDetailComponent,  clickableHeader: null} as IClickListData;
				
				//i++;
				// Networks End 
				
				
								
				

		}), err => console.log('HTTP Error', err),
			() => this.load());
	}


	populateCPUStats() {

		this.dockerService._GetDockerCPUStats().subscribe((result => {
			result = result.data;
			let dataPoints = [result[1], result[2]]
				this.charts[0].data = {
 'dataPoints' :  
  dataPoints
, 'linearGauge' : false,


'min' : 1000000,
'max' : result[0]['System Usage']
}
		
	  }),    err => console.log('HTTP Error', err),
				() => this.load());
	}

	stopRefreshInterval() {
		if (this.intervalRefreshSubscription) {
			this.intervalRefreshSubscription.unsubscribe();
		}
	}

}
