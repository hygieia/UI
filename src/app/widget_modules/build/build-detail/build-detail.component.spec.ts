import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildDetailComponent } from './build-detail.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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
    const detailData = [{
      title: 'build1',
      timestamp: 1552590574305,
      description: 'sample',
    }];
    component.detailData = detailData;
    expect(component.data).toEqual(detailData);

    component.detailData = null;
    expect(component.data).toEqual(null);
  });
});
