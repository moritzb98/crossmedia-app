import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EinkaufslistePage } from './einkaufsliste.page';

const routes: Routes = [
  {
    path: '',
    component: EinkaufslistePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EinkaufslistePageRoutingModule {}
