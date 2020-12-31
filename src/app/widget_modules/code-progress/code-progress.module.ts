import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CodeProgressConfigFormComponent } from './code-progress-config-form/code-progress-config-form.component';
import { CodeProgressDetailComponent } from './code-progress-detail/code-progress-detail.component';
import { CodeProgressWidgetComponent } from './code-progress-widget/code-progress-widget.component';
import { CodeProgressDeleteFormComponent} from './code-progress-delete-form/code-progress-delete-form.component';

@NgModule({
  declarations: [CodeProgressWidgetComponent, CodeProgressConfigFormComponent, CodeProgressDetailComponent, CodeProgressDeleteFormComponent],
  entryComponents: [CodeProgressWidgetComponent, CodeProgressConfigFormComponent, CodeProgressDetailComponent, CodeProgressDeleteFormComponent],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule
  ],
  exports: []
})
export class CodeProgressModule { }
