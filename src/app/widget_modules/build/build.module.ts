import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

import { BuildConfigFormComponent } from './build-config-form/build-config-form.component';
import { BuildDetailComponent } from './build-detail/build-detail.component';
import { BuildRoutingModule } from './build-routing-module';
import { BuildWidgetComponent } from './build-widget/build-widget.component';
import {BuildDeleteFormComponent} from './build-delete-form/build-delete-form.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CodeProgressComponent} from './code-progress-table/code-progress.component';
@NgModule({
  declarations: [BuildWidgetComponent, BuildConfigFormComponent, BuildDetailComponent, BuildDeleteFormComponent, CodeProgressComponent],
  entryComponents: [BuildWidgetComponent, BuildConfigFormComponent, BuildDetailComponent, BuildDeleteFormComponent, CodeProgressComponent],
  imports: [
    BuildRoutingModule,
    CommonModule,
    NgbModule,
    SharedModule,
    NgxDatatableModule
  ],
  exports: []
})
export class BuildModule { }
