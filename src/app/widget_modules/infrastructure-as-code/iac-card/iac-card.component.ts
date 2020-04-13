
import {
	AfterViewInit,
	Component,
	OnInit
} from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { IACService } from '../iac.service';
import { IACMasterComponent } from '../iac-master/iac-master.component';

@Component({
	selector: 'app-iac-card',
	templateUrl: './iac-card.component.html',
	styleUrls: ['./iac-card.component.sass']
})
export class IACCardComponent extends IACMasterComponent implements OnInit, AfterViewInit {

	// Inherited Properties
	stage: string;
	message: string;
	
	// Custom Properties
	// the date will be brought from REST
	data: any;
	title: string = "Quick View";
	view = [400, 300];
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
