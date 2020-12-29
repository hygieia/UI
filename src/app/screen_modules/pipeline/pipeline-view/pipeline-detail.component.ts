import {Component, Input, OnInit, Type} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { IClickListItemDeploy } from '../../../shared/charts/click-list/click-list-interfaces';

@Component({
  selector: 'app-pipeline-detail',
  templateUrl: './pipeline-detail.component.html',
  styleUrls: ['./pipeline-detail.component.scss']
})
export class PipelineDetailComponent implements OnInit {
  @Input() detailView: Type<any>;

  public data: IClickListItemDeploy;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  @Input()
  set detailData(data: any) {
    this.data = data;
  }
}
