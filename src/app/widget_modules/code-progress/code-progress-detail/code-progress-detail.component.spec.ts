import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeProgressDetailComponent } from './code-progress-detail.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

describe('DeployDetailComponent', () => {
  let component: CodeProgressDetailComponent;
  let fixture: ComponentFixture<CodeProgressDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeProgressDetailComponent ],
      providers: [ NgbActiveModal ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeProgressDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
