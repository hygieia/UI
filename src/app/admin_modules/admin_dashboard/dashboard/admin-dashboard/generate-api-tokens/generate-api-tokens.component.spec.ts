import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateApiTokensComponent } from './generate-api-tokens.component';

describe('GenerateApiTokensComponent', () => {
  let component: GenerateApiTokensComponent;
  let fixture: ComponentFixture<GenerateApiTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateApiTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateApiTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
