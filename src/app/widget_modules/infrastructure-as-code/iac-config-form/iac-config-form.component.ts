import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators';
import { CollectorService } from 'src/app/shared/collector.service';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { IACService } from '../iac.service';

import { WidgetHeaderComponent } from 'src/app/shared/widget-header/widget-header.component'
import {COLLECTOR_TYPE} from '../interfaces';

@Component({
  selector: 'app-iac-config-form',
  templateUrl: './iac-config-form.component.html',
  styleUrls: ['./iac-config-form.component.scss']
})
export class IACConfigFormComponent implements OnInit,  AfterViewInit {

  private widgetConfigId: string;
  private componentId: string;
  private collectorType: string = "InfrastructureAsCode";
  private collectorId : string;
  private collectorItemId: string;
  //collector: Collector;
  dashboard: any;	 
  iacConfigForm: FormGroup;

  model: any;
  searching = false;
  searchFailed = false;

  typeAheadResults: (text$: Observable<string>) => Observable<any>;

  getIACTitle = (collectorItem: any) => {
    if (!collectorItem) {
      return '';
    }
    const description = (collectorItem.description as string);
    return collectorItem.niceName + ' : ' + description;
  }

  @Input()
  set widgetConfig(widgetConfig: any) {

    console.log(widgetConfig);
    this.widgetConfigId = widgetConfig.options.id;
    this.iacConfigForm.get('apiToken').setValue(widgetConfig.options.apiToken);
  }

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private collectorService: CollectorService,
    private dashboardService: DashboardService,
    private iacService: IACService 
  ) {
    this.createForm();
  }

  ngOnInit() {

    this.loadSavedIACJob();
  
  }

ngAfterViewInit() 
{
	
	  this.getDashboardComponent();
    this.getCollectorDetails();
}

  private createForm() {
    this.iacConfigForm = this.formBuilder.group({
      apiToken: ['', Validators.required],
	  description: [''],
    });
  }

  private submitForm() {
	
	var collectorItemRequest = {
    collectorId : this.collectorId,
    id: this.widgetConfigId,
		options: {
      apiToken: this.iacConfigForm.value.apiToken,
      description: this.iacConfigForm.value.description
		}
	}
  
  this.createCollectorItem(collectorItemRequest);
	
   

  }

  private createCollectorItem(config){
  
    
    if(this.collectorItemId){
      return;// TO DO : Update is revoked as of now
    }
    this.iacService.createCollectorItem(config).pipe(take(1)).subscribe({
			next: result => { if(result && result.id){
        this.collectorItemId = result.id;
        //this.addCollectortoWidget(result.id);
        
      const newConfig = {
      name: 'InfrastrutureAsCode',
      options: {
        id: this.widgetConfigId,
        apiToken: this.iacConfigForm.value.apiToken
      },
      componentId: this.componentId,
      collectorItemIds: [result.id]
    };

    this.activeModal.close(newConfig);
/*    this.dashboardService.upsertWidget(newConfig).subscribe(result => {
      console.log(result);
    });
		*/		
			}},
			error: err => {},
			complete: () => {}
	});
  }


  private loadSavedIACJob() {
    this.dashboardService.dashboardConfig$.pipe(take(1),
      map(dashboard => {
        const iacCollector = dashboard.application.components[0].collectorItems.InfrastrutureAsCode;
        const savedCollectorIACJob = iacCollector ? iacCollector[0].description : null;

        if (savedCollectorIACJob) {
          const iacId = iacCollector[0].id;
          return iacId;
        }
        return null;
      }),
      switchMap(iacId => {
        if (iacId) {
          return this.collectorService.getItemsById(iacId);
        }
        return of(null);
      })).subscribe(collectorData => {
        console.log(collectorData)
        this.iacConfigForm.get('apiToken').setValue(collectorData);
      });
  }

  private getDashboardComponent() {
    this.dashboardService.dashboardConfig$.pipe(take(1),
      map(dashboard => {
	    this.dashboard = dashboard;
        return dashboard.application.components[0].id;
      })).subscribe(componentId => this.componentId = componentId);
  }

  private getCollectorDetails() {
    this.iacService.getCollectorByType(this.collectorType).pipe(take(1)).subscribe(collector =>  {
    this.collectorId = collector[0].id});  
  }

}
