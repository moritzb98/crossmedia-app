import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EinkaufslistePageRoutingModule } from './einkaufsliste-routing.module';

import { EinkaufslistePage } from './einkaufsliste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EinkaufslistePageRoutingModule
  ],
  declarations: [EinkaufslistePage]
})
export class EinkaufslistePageModule {}
