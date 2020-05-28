import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildDetailComponent } from './build-detail.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DashStatus} from "../../../shared/dash-status/DashStatus";

describe('BuildDetailComponent', () => {
  let component: BuildDetailComponent;
  let fixture: ComponentFixture<BuildDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildDetailComponent ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set detailData', () => {
    const detailData = {
      status: DashStatus.PASS,
      statusText: 'status',
      title: 'buildTitle',
      subtitles: [],
      url: 'buildUrl',
      lastUpdated: 1587131351
    };
    component.detailData = detailData;
    component.detailData = null;
  });
});
