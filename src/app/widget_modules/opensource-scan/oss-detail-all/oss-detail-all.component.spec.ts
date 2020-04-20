import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OSSDetailAllComponent } from './oss-detail-all.component';
import {DashStatus} from "../../../shared/dash-status/DashStatus";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OSSDetailAllComponent', () => {
  let component: OSSDetailAllComponent;
  let fixture: ComponentFixture<OSSDetailAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgbModule, SharedModule, HttpClientTestingModule],
      declarations: [ ],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OSSDetailAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    component.ngOnInit();
  });

  it('should set detailData', () => {
    const detailData = {
      status: DashStatus.PASS,
      statusText: 'oss.level',
      title: 'ossStatusTitle',
      subtitles: [],
      url: 'reportUrl',
      components: [],
      lastUpdated: 1587131399
    };
    component.detailData = detailData;
    expect(component.data).toEqual(detailData);

    component.detailData = null;
    expect(component.data).toEqual(null);
  });
});
