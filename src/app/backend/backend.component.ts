import { Angebot, AngeboteService } from '../services/angebote.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss'],
})
export class BackendComponent implements OnInit {

  deal: Angebot = {
    title: '',
    content: '',
    store: '',
    price_new: '',
    price_old: '',
    category: '',
    img: '',
  };

  test;

  constructor(private dealService: AngeboteService, private toastCtrl: ToastController) { }

  ngOnInit() {}

  showToast(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
    }).then(toast => toast.present());
  }

  addDeal(){
    this.dealService.addDeal(this.deal).then(() => {
      this.showToast("Angebot hinzugefügt");
      this.deal = {
        title: '',
        content: '',
        store: '',
        price_new: '',
        price_old: '',
        category: '',
        img: '',
      };
    }, err => {
      this.showToast("Fehler");
    });
  }

  deleteDeal(){
    this.showToast("Noch nicht implementiert!");
  }

  updateDeal(){
    this.showToast("Noch nicht implementiert!");
  }

}
