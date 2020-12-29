import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PipelineDetailComponent } from './pipeline-detail.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

describe('PipelineDetailComponent', () => {
  let component: PipelineDetailComponent;
  let fixture: ComponentFixture<PipelineDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineDetailComponent ],
      providers: [ NgbActiveModal ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
