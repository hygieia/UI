import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DeployWidgetComponent } from './deploy-widget//deploy-widget.component';
import { DeployDetailComponent } from './deploy-detail/deploy-detail.component';
import { DeployConfigFormComponent } from './deploy-config-form/deploy-config-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DeployWidgetComponent,DeployDetailComponent, DeployConfigFormComponent],
  entryComponents:[DeployWidgetComponent,DeployDetailComponent],
  imports: [
    SharedModule,
    NgbModule,
  ],
  exports: [
  ]
})
export class DeployModule { }
