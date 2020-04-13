import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IACWidgetComponent } from './iac-widget/iac-widget.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IACRoutingModule {
  static components = [IACWidgetComponent];
}
