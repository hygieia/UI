import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cloneDeep, extend } from 'lodash';
import { interval, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { filter, map, startWith, take } from 'rxjs/operators';
import {IAuditResult} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashboardRoute = '/api/dashboard/';

  private dashboardAuditRoute = '/apiaudit/auditresult/dashboard/title/';

  private dashboardSubject = new ReplaySubject<any>(1);

  private dashboardAuditSubject = new ReplaySubject<any>(1);

  private dashboardRefreshSubject = new Subject<any>();

  private dashboardRefreshSubscription: Subscription;

  private REFRESH_INTERVAL_SECONDS = 3000;

  private dashboardId: string;

  public dashboardConfig$ = this.dashboardSubject.asObservable().pipe(filter(result => result));

  public dashboardAuditConfig$ = this.dashboardAuditSubject.asObservable().pipe(filter(result => result));

  public dashboardRefresh$ = this.dashboardRefreshSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Retrieve a new dashboard from the API, and push it to subscribers
  loadDashboard(dashboardId: string) {
    this.dashboardId = dashboardId;
    this.http.get(this.dashboardRoute + dashboardId).subscribe(res => this.dashboardSubject.next(res));
    this.dashboardConfig$.pipe(map(dashboard => dashboard)).subscribe(dashboard => {
      this.http.get<IAuditResult[]>(this.dashboardAuditRoute + dashboard.title).subscribe(res => this.dashboardAuditSubject.next(res));
    });
    this.dashboardRefreshSubscription = interval(1000 * this.REFRESH_INTERVAL_SECONDS).pipe(
      startWith(-1)).subscribe(res => this.dashboardRefreshSubject.next(res));
  }

  clearDashboard() {
    this.dashboardId = null;
    this.dashboardSubject.next(null);
    if (this.dashboardRefreshSubscription) {
      this.dashboardRefreshSubscription.unsubscribe();
    }
  }

  // Clone the passed widget config, and post the updated widget to the API
  upsertWidget(widgetConfig: any): Observable<any> {
    widgetConfig = cloneDeep(widgetConfig);

    const widgetId = widgetConfig.id;
    if (widgetId) {
      delete widgetConfig.id;
    }

    const apiCall = widgetId ?
      this.http.put(this.dashboardRoute + this.dashboardId + '/widget/' + widgetId, widgetConfig) :
      this.http.post(this.dashboardRoute + this.dashboardId + '/widget', widgetConfig);

    return apiCall;
  }

  // Take a new component and config returned by the API, and update the data locally.
  // Push this new version to subscibers.
  upsertLocally(newComponent: any, newConfig: any) {
    // Find and update component
    let tempDashboard$ = this.dashboardConfig$.pipe(take(1), map(dashboard => {
      if (newComponent == null) {
        return dashboard;
      }
      let foundComponent = false;
      dashboard.application.components.forEach((component: any, index: number) => {
        if (component.id === newComponent.id) {
          foundComponent = true;
          dashboard.application.components[index] = newComponent;
        }
      });
      if (!foundComponent) {
        dashboard.application.components.push(newComponent);
      }
      return dashboard;
    }));

    // Find and update config
    tempDashboard$ = tempDashboard$.pipe(map(dashboard => {
      let foundMatch = false;
      const filteredWidgets = dashboard.widgets.filter((config: any) => config.options.id === newConfig.options.id);
      filteredWidgets.forEach((config: any, index: number) => {
        foundMatch = true;
        dashboard.widgets[index] = extend(config, newConfig);
      });
      if (!foundMatch) {
        dashboard.widgets.push(newConfig);
      }
      return dashboard;
    }));

    tempDashboard$.subscribe(dashboard => this.dashboardSubject.next(dashboard));
  }

}
