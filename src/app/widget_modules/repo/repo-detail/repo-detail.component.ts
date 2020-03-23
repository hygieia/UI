import {Component, Input, OnInit, Type} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ILineChartRepoItem} from '../../../shared/charts/line-chart/line-chart-interfaces';

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.scss']
})
export class RepoDetailComponent implements OnInit {
  @Input() detailView: Type<any>;

  public data: ILineChartRepoItem;
  private dateClicked: Date;
  private repoDataInstances;
  private series: string;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  @Input()
  set lineChart(data: any) {
    this.dateClicked = data.name;
    this.series = data.series;
  }

  @Input()
  set detailData(data: any) {
    if (this.series === 'Commits') {
      this.repoDataInstances = data.dataPoints[0].instances;
    } else if (this.series === 'Pulls') {
      this.repoDataInstances = data.dataPoints[1].instances;
    } else {
      this.repoDataInstances = data.dataPoints[2].instances;
    }
    this.data = this.repoDataInstances.filter(repoInstance => {
      return (repoInstance.date).getTime() === (this.dateClicked).getTime();
    });
  }
}
