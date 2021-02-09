import { Favorite, FavoriteService } from './../services/favorite.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  private favorites: Observable<Favorite[]>;

  constructor(private favoriteService: FavoriteService, private toastController: ToastController) {}

  ngOnInit() {
    this.favorites = this.favoriteService.getFavorites();
  }

  delete(id){
    this.favoriteService.deleteFavorite(id);
    this.presentToast("Favorit entfernt.")
  }

  addToCart(){
    this.presentToast("Zum Warenkorb hinzugefügt. (Noch nicht implementiert)")
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
