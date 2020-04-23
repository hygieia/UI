import {
	AfterViewInit,
	Component,
	OnInit,
	Input,
} from '@angular/core';

import { interval, Observable} from 'rxjs';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { IACService } from '../iac.service';

@Component({
	selector: 'app-iac-master',
	templateUrl: './iac-master.component.html',
	styleUrls: ['./iac-master.component.sass'],
	providers: [NgbProgressbarConfig]
})
export class IACMasterComponent implements OnInit, AfterViewInit {
	@Input()
	stage: string;

	@Input()
	message: string;

	// Refresh frequecy in ms, defaults to a min
	@Input()
	frequency: number = 10000;

	refresh: Observable<number>;

	observer: Observable<any>;

	constructor(iacService: IACService,
		config: NgbProgressbarConfig) {
		// config is to set the progress bar	
		config.animated = true;
		config.type = 'success';
		config.height = '20px';
		
		// The observer for REST data subscription
		this.refresh = interval(this.frequency);
		this.observer = this.refresh.pipe();
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.stage = "LOADING";
	}

}
