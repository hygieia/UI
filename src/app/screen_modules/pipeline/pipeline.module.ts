import { NgModule } from '@angular/core';
import { PipelineDetailComponent } from './pipeline-view/pipeline-detail.component';
import { PipelineRoutingModule } from './pipeline-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PipelineDetailComponent
  ],
  imports: [
    SharedModule,
    PipelineRoutingModule

  ]
})
export class PipelineModule { }
