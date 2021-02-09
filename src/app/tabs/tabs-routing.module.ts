import { SupermarktdetailComponent } from './../supermarktdetail/supermarktdetail.component';
import { AngebotDetailComponent } from './../angebot-detail/angebot-detail.component';
import { SupermaerktePage } from './../supermaerkte/supermaerkte.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { EinstellungenComponent } from './../einstellungen/einstellungen.component';


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
        path: 'einstellungen',
        component: EinstellungenComponent
      },
      {
        path: 'supermarktdetail',
        component: SupermarktdetailComponent
      },
      {
        path: 'tab1/:id',
        component: AngebotDetailComponent
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
