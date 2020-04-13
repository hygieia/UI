import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

import { IACConfigFormComponent } from './iac-config-form/iac-config-form.component';
import { IACRoutingModule } from './iac-routing-module';
import { IACWidgetComponent } from './iac-widget/iac-widget.component';
import { IACMasterComponent } from './iac-master/iac-master.component'
import { Terraform } from './iac-master/iac-terraform';

@NgModule({
	  declarations: [IACWidgetComponent, IACConfigFormComponent, IACMasterComponent, Terraform],
  entryComponents: [IACConfigFormComponent, IACMasterComponent],
  imports: [
    IACRoutingModule,
    CommonModule,
    NgbModule,
    SharedModule
  ],
  exports: [
  ]
})
export class IACModule { 
	
}
