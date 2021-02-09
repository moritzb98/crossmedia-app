import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Angebot } from './angebote.service';

export interface Favorite {
  id?: string,
  title: string,
  category: string,
  img: string
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favorites: Observable<Favorite[]>;
  private favoritesCollection: AngularFirestoreCollection<Favorite>;

  constructor(private afs: AngularFirestore) {
    this.favoritesCollection = this.afs.collection<Favorite>('favorites');
    this.favorites = this.favoritesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
 }

  getFavorites(): Observable<Favorite[]> {
    return this.favorites;
  }

  getFavorite(id: string): Observable<Favorite> {
    return this.favoritesCollection.doc<Favorite>(id).valueChanges().pipe(
      take(1),
      map(favorite => {
        favorite.id = id;
        return favorite;
      })
    );
  }

  addFavorite(favorite: Favorite): Promise<DocumentReference> {
    return this.favoritesCollection.add(favorite);
  }

  deleteFavorite(id: string): Promise<void> {
    return this.favoritesCollection.doc(id).delete();
  }

}
