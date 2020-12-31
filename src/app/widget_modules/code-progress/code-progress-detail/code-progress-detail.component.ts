import {Component, Input, OnInit, Type} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { IClickListItemDeploy } from '../../../shared/charts/click-list/click-list-interfaces';

@Component({
  selector: 'app-code-progress-detail',
  templateUrl: './code-progress-detail.component.html',
  styleUrls: ['./code-progress-detail.component.scss']
})
export class CodeProgressDetailComponent implements OnInit {
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
