import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngeboteService, Angebot } from '../services/angebote.service';
import { Favorite, FavoriteService } from '../services/favorite.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-angebot-detail',
  templateUrl: './angebot-detail.component.html',
  styleUrls: ['./angebot-detail.component.scss'],
})
export class AngebotDetailComponent implements OnInit {

  deal: Angebot = {
    title: '',
    content: '',
    store: '',
    price_new: '',
    price_old: '',
    category: '',
    img: '',
  };

  favorite: Favorite = {
    title: '',
    category: '',
    img: ''
  };

  constructor(private activatedRouter: ActivatedRoute, private dealService: AngeboteService, private favoriteService: FavoriteService, private toastController: ToastController) { }

  ngOnInit() {
    let id = this.activatedRouter.snapshot.paramMap.get('id');
    if(id){
      this.dealService.getDeal(id).subscribe(deal => {
        this.deal = deal;
      })
    }
  }

  addToFavorite(deal){
    this.favorite.title = deal.title;
    this.favorite.category = deal.category;
    this.favorite.img = deal.img;
    this.favoriteService.addFavorite(this.favorite);
    this.presentToast("Zu Favoriten hinzugefügt");
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
