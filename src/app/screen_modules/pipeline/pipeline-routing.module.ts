import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PipelineDetailComponent } from './pipeline-view/pipeline-detail.component';

const routes: Routes = [
  { path: 'pipeline-view/detail', component: PipelineDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipelineRoutingModule {
  static components = [PipelineDetailComponent];

}
