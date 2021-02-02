import { SupermaerktePage } from './../supermaerkte/supermaerkte.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'einkaufsliste',
        loadChildren: () => import('../einkaufsliste/einkaufsliste.module').then( m => m.EinkaufslistePageModule)
      },
      {
        path: 'supermaerkte',
        loadChildren: () => import('../supermaerkte/supermaerkte.module').then( m => m.SupermaerktePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab2',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab2',
    pathMatch: 'full'
  },
  {
    path: 'supermaerkte',
    component: SupermaerktePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
