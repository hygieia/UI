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
import {forkJoin, of, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, map, startWith, switchMap, tap} from 'rxjs/operators';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { LayoutDirective } from 'src/app/shared/layouts/layout.directive';
import { TwoByTwoLayoutComponent } from 'src/app/shared/layouts/two-by-two-layout/two-by-two-layout.component';
import { WidgetComponent } from 'src/app/shared/widget/widget.component';
import { RepoService } from '../repo.service';
import { REPO_CHARTS} from './repo-charts';
import { IRepo } from '../interfaces';
import {CollectorService} from '../../../shared/collector.service';

@Component({
  selector: 'app-repo-widget',
  templateUrl: './repo-widget.component.html',
  styleUrls: ['./repo-widget.component.scss']
})
export class RepoWidgetComponent extends WidgetComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly REPO_PER_DAY_TIME_RANGE = 14;
  private readonly TOTAL_REPO_COUNTS_TIME_RANGES = [7, 14];
  // Reference to the subscription used to refresh the widget
  private intervalRefreshSubscription: Subscription;
  private params;
  private groupedCommitData = [];
  private groupedPullData = [];
  private groupedIssueData = [];

  @ViewChild(LayoutDirective, {static: false}) childLayoutTag: LayoutDirective;

  constructor(componentFactoryResolver: ComponentFactoryResolver,
              cdr: ChangeDetectorRef,
              dashboardService: DashboardService,
              route: ActivatedRoute,
              collectorService: CollectorService,
              private repoService: RepoService) {
    super(componentFactoryResolver, cdr, dashboardService, route);
  }

  // Initialize the widget and set layout and charts.
  ngOnInit() {
    this.widgetId = 'repo0';
    this.layout = TwoByTwoLayoutComponent;
    this.charts = REPO_CHARTS;
    this.init();
  }

  // After the view is ready start the refresh interval.
  ngAfterViewInit() {
    this.startRefreshInterval();
  }

  ngOnDestroy() {
    this.stopRefreshInterval();
  }

  startRefreshInterval() {
    this.intervalRefreshSubscription = this.dashboardService.dashboardRefresh$.pipe(
      startWith(-1), // Refresh this widget separate from dashboard (ex. config is updated)
      distinctUntilChanged(), // If dashboard is loaded the first time, ignore widget double refresh
      switchMap(_ => this.getCurrentWidgetConfig()),
      switchMap(widgetConfig => {
        if (!widgetConfig) {
          return of([]);
        }
        this.params = {
          componentId: widgetConfig.componentId,
          numberOfDays: 14
        };
        return forkJoin(
          this.repoService.fetchCommits(this.params.componentId, this.params.numberOfDays).pipe(catchError(err => of(err))),
          this.repoService.fetchPullRequests(this.params.componentId, this.params.numberOfDays).pipe(catchError(err => of(err))),
          this.repoService.fetchIssues(this.params.componentId, this.params.numberOfDays).pipe(catchError(err => of(err))));
      })).subscribe(([commits, pulls, issues]) => {
      this.generateRepoPerDay(commits, pulls, issues);
      this.generateTotalRepoCounts(commits, pulls, issues);
      super.loadComponent(this.childLayoutTag);
    });
  }

  // Unsubscribe from the widget refresh observable, which stops widget updating.
  stopRefreshInterval() {
    if (this.intervalRefreshSubscription) {
      this.intervalRefreshSubscription.unsubscribe();
    }
  }

  // *********************** REPO STATS PER DAY ************************
  generateRepoPerDay(commitResult: IRepo[], pullResult: IRepo[], issueResult: IRepo[]) {
    const startDate = this.toMidnight(new Date());
    startDate.setDate(startDate.getDate() - this.REPO_PER_DAY_TIME_RANGE + 1);
    const allCommits = commitResult.filter(repo => this.checkRepoAfterDate(repo.scmCommitTimestamp, startDate));
    const allPulls = pullResult.filter(repo => this.checkRepoAfterDate(repo.timestamp, startDate));
    const allIssues = issueResult.filter(repo => this.checkRepoAfterDate(repo.timestamp, startDate));

    this.charts[0].data.dataPoints[0].series = this.countRepoPerDay(allCommits, startDate, 'commit');
    this.charts[0].data.dataPoints[1].series = this.countRepoPerDay(allPulls, startDate, 'pull');
    this.charts[0].data.dataPoints[2].series = this.countRepoPerDay(allIssues, startDate, 'issue');

    // Sends data to line chart component onSelect
    this.charts[0].data.dataPoints[0].instances = this.groupedCommitData;
    this.charts[0].data.dataPoints[1].instances = this.groupedPullData;
    this.charts[0].data.dataPoints[2].instances = this.groupedIssueData;
  }

  countRepoPerDay(allInRepo: IRepo[], startDate: Date, type: string): any[] {
    const counts = {};
    const date = new Date(startDate.getTime());
    let regexNumber;
    let repoTime;
    for (let i = 0; i < this.REPO_PER_DAY_TIME_RANGE; i++) {
      counts[this.toMidnight(date).getTime()] = 0;
      date.setDate(date.getDate() + 1);
    }
    allInRepo.forEach(repo => {
      let obj = {};
      if (type === 'commit') {
        repoTime = repo.scmCommitTimestamp;
      } else {
        repoTime = repo.timestamp;
      }
      const index = this.toMidnight(new Date(repoTime)).getTime();
      counts[index] = counts[index] + 1;

      if (repo.scmRevisionNumber) {
        regexNumber = repo.scmRevisionNumber.match(new RegExp('^.{0,7}'))[0];
      }

      if (type === 'commit') {
        obj = {
          number: repo.scmRevisionNumber,
          regexNum: regexNumber,
          author: repo.scmAuthor,
          message: repo.scmCommitLog,
          time: repo.scmCommitTimestamp,
          date: new Date(index)
        };
        this.groupedCommitData.push(obj);
      } else if (type === 'pull') {
        obj = {
          number: repo.number,
          regexNum: repo.number,
          author: repo.mergeAuthor,
          message: repo.scmCommitLog,
          time: repo.mergedAt,
          date: new Date(index)
        };
        this.groupedPullData.push(obj);
      } else {
        obj = {
          number: repo.scmRevisionNumber,
          regexNum: regexNumber,
          author: repo.scmAuthor,
          message: repo.scmCommitLog,
          time: repo.timestamp,
          date: new Date(index)
        };
        this.groupedIssueData.push(obj);
      }
    });
    const dataArray = [];
    for (const key of Object.keys(counts)) {
      const data = counts[key];
      dataArray.push(
        {
          name: new Date(+key),
          value: data
        }
      );
    }
    return dataArray;
  }

  // *********************** TOTAL REPO COUNTS ************************
  generateTotalRepoCounts(commitResult: IRepo[], pullResult: IRepo[], issueResult: IRepo[]) {
    const today = this.toMidnight(new Date());
    const bucketOneStartDate = this.toMidnight(new Date());
    const bucketTwoStartDate = this.toMidnight(new Date());
    bucketOneStartDate.setDate(bucketOneStartDate.getDate() - this.TOTAL_REPO_COUNTS_TIME_RANGES[0] + 1);
    bucketTwoStartDate.setDate(bucketTwoStartDate.getDate() - this.TOTAL_REPO_COUNTS_TIME_RANGES[1] + 1);

    const commitTodayCount = commitResult.filter(repo => this.checkRepoAfterDate(repo.scmCommitTimestamp, today)).length;
    const commitBucketOneCount = commitResult.filter(repo => this.checkRepoAfterDate(repo.scmCommitTimestamp, bucketOneStartDate)).length;
    const commitBucketTwoCount = commitResult.filter(repo => this.checkRepoAfterDate(repo.scmCommitTimestamp, bucketTwoStartDate)).length;

    const pullTodayCount = pullResult.filter(repo => this.checkRepoAfterDate(repo.timestamp, today)).length;
    const pullBucketOneCount = pullResult.filter(repo => this.checkRepoAfterDate(repo.timestamp, bucketOneStartDate)).length;
    const pullBucketTwoCount = pullResult.filter(repo => this.checkRepoAfterDate(repo.timestamp, bucketTwoStartDate)).length;

    const issueTodayCount = issueResult.filter(repo => this.checkRepoAfterDate(repo.timestamp, today)).length;
    const issueBucketOneCount = issueResult.filter(repo => this.checkRepoAfterDate(repo.timestamp, bucketOneStartDate)).length;
    const issueBucketTwoCount = issueResult.filter(repo => this.checkRepoAfterDate(repo.timestamp, bucketTwoStartDate)).length;

    this.charts[2].data[0].value = commitTodayCount;
    this.charts[2].data[1].value = commitBucketOneCount;
    this.charts[2].data[2].value = commitBucketTwoCount;
    this.charts[2].data[3].value = pullTodayCount;
    this.charts[2].data[4].value = pullBucketOneCount;
    this.charts[2].data[5].value = pullBucketTwoCount;
    this.charts[2].data[6].value = issueTodayCount;
    this.charts[2].data[7].value = issueBucketOneCount;
    this.charts[2].data[8].value = issueBucketTwoCount;
  }

  //// *********************** HELPER UTILS *********************
  private toMidnight(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  private checkRepoAfterDate(repoTime: string, date: Date): boolean {
    return new Date(repoTime) >= date;
  }
}


