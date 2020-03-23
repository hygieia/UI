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
import {catchError, distinctUntilChanged, map, startWith, switchMap, tap, timeInterval} from 'rxjs/operators';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { LayoutDirective } from 'src/app/shared/layouts/layout.directive';
import { TwoByTwoLayoutComponent } from 'src/app/shared/layouts/two-by-two-layout/two-by-two-layout.component';
import { WidgetComponent } from 'src/app/shared/widget/widget.component';
import { RepoService } from '../repo.service';
import { REPO_CHARTS} from './repo-charts';
import { IRepo } from '../interfaces';
import {CollectorService} from '../../../shared/collector.service';
import * as moment from 'moment';
import * as _ from 'lodash';

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
  private groupedCommit = [];
  private groupedPull = [];
  private groupedIssue = [];

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

    // TODO: Fix - (ADDED FOR NOW) because I can't get the countRepoPerDay object items AND the length returned.
    this.charts[0].data.dataPoints[0].instances = this.groupedCommit;
    this.charts[0].data.dataPoints[1].instances = this.groupedPull;
    this.charts[0].data.dataPoints[2].instances = this.groupedIssue;
  }

  countRepoPerDay(allInRepo: IRepo[], startDate: Date, type: string): any[] {
    const counts = {};
    const date = new Date(startDate.getTime());
    let repoTime;
    let repoNumber;
    let repoRegex;
    let repoAuthor;
    for (let i = 0; i < this.REPO_PER_DAY_TIME_RANGE; i++) {
      counts[this.toMidnight(date).getTime()] = 0;
      date.setDate(date.getDate() + 1);
    }
    const dataArray = allInRepo.map(repo => {
      let obj = {};
      if (type === 'commit') {
        repoNumber = repo.scmRevisionNumber;
        repoRegex = repo.scmRevisionNumber.match(new RegExp('^.{0,7}'))[0];
        repoAuthor = repo.scmAuthor;
        repoTime = repo.scmCommitTimestamp;
      } else if (type === 'pull') {
        repoNumber = repo.number;
        repoRegex = repo.number;
        repoAuthor = repo.mergeAuthor;
        repoTime = repo.timestamp;
      } else {
        repoNumber = repo.scmRevisionNumber;
        repoRegex = repo.scmRevisionNumber.match(new RegExp('^.{0,7}'))[0];
        repoAuthor = repo.scmAuthor;
        repoTime = repo.timestamp;
      }
      const index = this.toMidnight(new Date(repoTime)).getTime();
      counts[index] = counts[index] + 1;
      obj = {
        number: repoNumber,
        regexNumber: repoRegex,
        author: repoAuthor,
        message: repo.scmCommitLog,
        time: repoTime,
        date: index
      };
      return obj;
    });

    const dataArrayToSend = [];
    const groupedResults = _.groupBy(dataArray, (result) => moment(new Date(result['time']), 'DD/MM/YYYY').startOf('day'));
    for (const key of Object.keys(groupedResults)) {
      if (type === 'commit') {
        this.groupedCommit.push(groupedResults[key]);
      } else if (type === 'issue') {
        this.groupedIssue.push(groupedResults[key]);
      } else {
        this.groupedPull.push(groupedResults[key]);
      }
      dataArrayToSend.push(
        {
          name: new Date(key),
          value: groupedResults[key].length
        }
      );
    }
    return dataArrayToSend;
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


