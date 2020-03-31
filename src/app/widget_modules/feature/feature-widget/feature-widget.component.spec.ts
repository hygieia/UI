import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of, ReplaySubject } from 'rxjs';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { GET_DASHBOARD_MOCK, POST_DASHBOARD_MOCK } from '../../../shared/dashboard.service.mockdata';
import { FeatureService } from '../feature.service';
import { IFeature } from '../interfaces';
import { FeatureWidgetComponent } from './feature-widget.component';

class MockFeatureService {

  // mockBuildData = {
  //   result: [
  //     {
  //       id: '5c8a88ceaa8ebb3c1bfd1391',
  //       collectorItemId: '5b84328d92678d061457d5f1',
  //       timestamp: 1552583719241,
  //       number: '696',
  //       buildUrl: 'https://jenkins.com',
  //       startTime: 1552582765454,
  //       endTime: 1552583719091,
  //       duration: 953637,
  //       buildStatus: 'Success',
  //       codeRepos: [
  //         {
  //           url: 'https://github.com/org/repo',
  //           branch: 'master',
  //           type: 'GIT'
  //         }
  //       ],
  //       sourceChangeSet: []
  //     },
  //   ],
  //   lastUpdated: 1553613455230
  // };

  // fetchDetails(): Observable<IFeature[]> {
  //   return of(this.mockFeatureData.result);
  // }
}

class MockDashboardService {
  private dashboardSubject = new ReplaySubject<any>(1);

  public dashboardConfig$ = this.dashboardSubject.asObservable();
  public dashboardRefresh$ = from([1, 2, 3]);

  loadDashboard(dashboardId: string) {
    of(GET_DASHBOARD_MOCK).subscribe(res => this.dashboardSubject.next(res));
  }

  upsertWidget(dashboardId: string, widgetConfig: any) {
    return of(POST_DASHBOARD_MOCK);
  }

  upsertLocally(newComponent: any, newConfig: any) {
    of(GET_DASHBOARD_MOCK).subscribe(dashboard => this.dashboardSubject.next(dashboard));
  }

  clearDashboard() {}
}

@NgModule({
  declarations: [],
  imports: [HttpClientTestingModule, SharedModule, CommonModule, BrowserAnimationsModule, RouterModule.forRoot([]), NgbModule],
  entryComponents: []
})
class TestModule { }

describe('FeatureWidgetComponent', () => {
  let component: FeatureWidgetComponent;
  let featureService: FeatureService;
  let dashboardService: DashboardService;
  let modalService: NgbModal;
  let fixture: ComponentFixture<FeatureWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FeatureService, useClass: MockFeatureService },
        { provide: DashboardService, useClass: MockDashboardService}
      ],
      imports: [
        TestModule, HttpClientTestingModule, SharedModule, CommonModule, BrowserAnimationsModule, RouterModule.forRoot([])
      ],
      declarations: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeatureWidgetComponent);
    component = fixture.componentInstance;
    featureService = TestBed.get(FeatureService);
    dashboardService = TestBed.get(DashboardService);
    modalService = TestBed.get(NgbModal);
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(featureService).toBeTruthy();
  });
});


