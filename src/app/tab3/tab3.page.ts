import { Favorite, FavoriteService } from './../services/favorite.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  private favorites: Observable<Favorite[]>;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.favorites = this.favoriteService.getFavorites();
  }

  delete(id){
    this.favoriteService.deleteFavorite(id);
  }

}
