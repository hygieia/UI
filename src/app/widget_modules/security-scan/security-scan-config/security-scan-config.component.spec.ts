import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityScanConfigComponent } from './security-scan-config.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('SecurityScanConfigComponent', () => {
  let component: SecurityScanConfigComponent;
  let fixture: ComponentFixture<SecurityScanConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, NgbModule],
      declarations: [ SecurityScanConfigComponent ],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityScanConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set widgetConfig', () => {
    let widgetConfigData = {
      options: {
        id: 1234,
        sJob: '',
      }
    };
    component.widgetConfig = widgetConfigData;

    widgetConfigData = null;
    component.widgetConfig = widgetConfigData;
  });

  it('should call ngOnInit()', () => {
    component.ngOnInit();
  });
});
