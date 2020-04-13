import {Component, Input, OnInit, Output} from '@angular/core';
import {
  IClickListItemStaticAnalysis
} from "../../../shared/charts/click-list/click-list-interfaces";

@Component({
  selector: 'app-build-detail',
  templateUrl: './staticAnalysis-detail.component.html',
  styleUrls: ['./staticAnalysis-detail.component.scss']
})
export class StaticAnalysisDetailComponent implements OnInit {

  public data: IClickListItemStaticAnalysis;

  constructor() {}

  ngOnInit() {
  }

  // click list header details
  @Input()
  set detailData(data: any) {
    this.data = data;
  }

  isDate(obj): boolean {
    return obj instanceof Date;
  }
}
