import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupermaerktePageRoutingModule } from './supermaerkte-routing.module';

import { SupermaerktePage } from './supermaerkte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupermaerktePageRoutingModule
  ],
  declarations: [SupermaerktePage]
})
export class SupermaerktePageModule {}
