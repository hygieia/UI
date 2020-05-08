import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { EditDashboardComponent } from './edit-dashboard.component';
import { AdminOrderByPipe } from '../../../pipes/order-by.pipe';
import { AdminFilterPipe } from '../../../pipes/filter.pipe';
import { DashboardDataService } from '../../../services/dashboard-data.service';
import { CmdbDataService } from '../../../services/cmdb-data.service';
import { AdminDashboardService } from '../../../services/dashboard.service';
import { PaginationWrapperService } from '../../../services/pagination-wrapper.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditDashboardModalComponent } from '../modal/edit-dashboard-modal/edit-dashboard-modal.component';
import { NgModule } from '@angular/core';
import { DashEditComponent } from '../dash-edit/dash-edit.component';
import { DashTrashComponent } from '../dash-trash/dash-trash.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DASHBOARDDATA, DASHBOARDDATARESPONSE } from '../../../services/user-data.service.mockdata';

class MockDashboardDataService {
  data = { data: DASHBOARDDATA };
  getPromise(route) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  search() {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  mydashboard(username) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  myowner(id) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  getComponent(componentId) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  owners(id) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  updateOwners(id, owners) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  detail(id) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  create(data) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  renameDashboard(id, newDashboardName) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  deleteDashboard(id) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  types() {
    return [
      {
        id: 'team',
        name: 'Team'
      },
      {
        id: 'product',
        name: 'Product'
      }
    ];
  }
  upsertWidget(dashboardId, widget) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  updateBusItems(id, data) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  updateDashboardWidgets(id, data) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  deleteWidget(dashboardId, widget) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  count(type) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  public searchByPage(params) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  filterByTitle(params) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  filterCount(title, type) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  getPageSize() {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  myDashboardsCount(type) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  searchMyDashboardsByPage(params) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  filterMyDashboardsByTitle(params) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  filterMyDashboardCount(title, type) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  getGeneralConfig(id) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  generalConfigSave(obj) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  updateDashboardScoreSettings(id, scoreEnabled, scoreDisplay) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
}

class MockPaginationWrapperService {
  data = { data: DASHBOARDDATA };
  responseData = DASHBOARDDATARESPONSE;
  calculateTotalItems(type) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  calculateTotalItemsMyDash(type) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  getTotalItems() {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  getTotalItemsMyDash() {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  getCurrentPage() {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  getPageSize() {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  getDashboards() {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  getMyDashboards() {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  setDashboards(paramDashboards) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  getInvalidAppOrCompError(data) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  pageChangeHandler(pageNumber, type) {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  pageChangeHandlerForMyDash = (pageNumber, type) => {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  public processDashboardResponse = (response) => {
    return this.responseData;
  }
  public processDashboardFilterResponse = (response) => {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  public processDashboardError = (data) => {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  public processMyDashboardResponse = (response) => {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  public processFilterMyDashboardResponse = (response) => {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  public processMyDashboardError = (data) => {
    return { subscribe: (callBack) => callBack(this.data) };
  }
  filterByTitle = (title, type) => {
    return { subscribe: (callBack) => callBack(this.data) };
  }
}


@NgModule({
  declarations: [EditDashboardComponent, AdminFilterPipe, AdminOrderByPipe,
    EditDashboardModalComponent, DashTrashComponent, DashEditComponent],
  providers: [{ provide: DashboardDataService, useClass: MockDashboardDataService },
    CmdbDataService, AdminDashboardService, { provide: PaginationWrapperService, useClass: MockPaginationWrapperService }],
  imports: [FormsModule, CommonModule, NgbModule, ReactiveFormsModule, HttpClientTestingModule, SharedModule, HttpClientModule],
  entryComponents: [
    EditDashboardModalComponent]
})
class TestModule { }

describe('EditDashboardComponent', () => {
  let component: EditDashboardComponent;
  let fixture: ComponentFixture<EditDashboardComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


