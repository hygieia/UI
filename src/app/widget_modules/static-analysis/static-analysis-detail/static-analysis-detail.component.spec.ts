import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StaticAnalysisDetailComponent } from "./static-analysis-detail.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TimeAgoPipe} from "time-ago-pipe";
import {Type} from "@angular/core";
import {IClickListItem} from "../../../shared/charts/click-list/click-list-interfaces";

describe('StaticAnalysisDetailComponent', () => {
  let component: StaticAnalysisDetailComponent;
  let fixture: ComponentFixture<StaticAnalysisDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticAnalysisDetailComponent, TimeAgoPipe ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticAnalysisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set detailData', () => {
    let detailData = {
      name: 'sonar-project-1',
      timestamp: 1552590574305,
      url: 'https://sonar.com',
      items: [],
      clickableContent: null,
      clickableHeader: null,
    };
    component.detailData = detailData;
    expect(component.data).toEqual(detailData);

    component.detailData = null;
    expect(component.data).toEqual(null);
  });
});
