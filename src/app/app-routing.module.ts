import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'supermaerkte',
    loadChildren: () => import('./supermaerkte/supermaerkte.module').then( m => m.SupermaerktePageModule)
  },
  {
    path: 'einkaufsliste',
    loadChildren: () => import('./einkaufsliste/einkaufsliste.module').then( m => m.EinkaufslistePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
