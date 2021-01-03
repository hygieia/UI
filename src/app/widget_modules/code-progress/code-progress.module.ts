import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CodeProgressConfigFormComponent } from './code-progress-config-form/code-progress-config-form.component';
import { CodeProgressDetailComponent } from './code-progress-detail/code-progress-detail.component';
import { CodeProgressWidgetComponent } from './code-progress-widget/code-progress-widget.component';
import { CodeProgressDeleteFormComponent} from './code-progress-delete-form/code-progress-delete-form.component';
import {CodeProgressComponent} from './code-progress-table/code-progress.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [CodeProgressWidgetComponent, CodeProgressConfigFormComponent, CodeProgressDetailComponent, CodeProgressDeleteFormComponent, CodeProgressComponent],
  entryComponents: [CodeProgressWidgetComponent, CodeProgressConfigFormComponent, CodeProgressDetailComponent, CodeProgressDeleteFormComponent, CodeProgressComponent],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    NgxDatatableModule
  ],
  exports: []
})
export class CodeProgressModule { }
