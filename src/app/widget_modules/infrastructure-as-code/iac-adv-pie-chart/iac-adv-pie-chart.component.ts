
import {
	AfterViewInit,
	Component,
	OnInit,
} from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { IACService } from '../iac.service';
import { IACMasterComponent } from '../iac-master/iac-master.component';

@Component({
  selector: 'app-iac-adv-pie-chart',
  templateUrl: './iac-adv-pie-chart.component.html',
  styleUrls: ['./iac-adv-pie-chart.component.sass']
})
export class IACAdvPieChartComponent extends IACMasterComponent implements OnInit, AfterViewInit {
	
	// Inherited Properties
	stage: string;
	message: string;
	
	// Custom Properties
	// the date will be brought from REST
	data: any;
	
	title: string = "Pie View";
	view = [200, 200];
	colorScheme = {
		domain: ['#FFFF00', '#FFFF22', '#FFFF33', '#FFFF44', '#FFFF44', '#FFFF44', '#FFFF44', '#FFFF44', '#FFFF44']
	};
   
	constructor(private iacService: IACService,
		config: NgbProgressbarConfig) {
		super(iacService, config)
	}

	// custom init
	ngOnInit() {
	}

	// custom view properties and periodic job to auto refresh the data
	ngAfterViewInit() {
		this.startRefreshInterval();
	}
	
	startRefreshInterval(){
		this.observer.subscribe(x => {
			this.iacService._GetTerraformCardDetails().subscribe((result => {
				this.stage = result.status,
				this.data = result.data
			})
				, err => {
					this.data = [];
					this.stage = "ERROR";
				}
			);
		});
	}

}
