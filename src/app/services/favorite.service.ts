import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Angebot } from './angebote.service';
import { ToastController } from '@ionic/angular';

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

  constructor(private afs: AngularFirestore, private toastController: ToastController) {
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
    // this.afs.collection(`favorites`, ref => ref.where('title', "==", favorite.title)).snapshotChanges().subscribe(res => {
    //   if (res.length > 0)
    //   {
    //     this.presentToast("Favorit schon in der Liste");
    //     return null;
    //   }
    //   else
    //   {
        return this.favoritesCollection.add(favorite);
    //   }
    // });
    // return null;
  }

  deleteFavorite(id: string): Promise<void> {
    return this.favoritesCollection.doc(id).delete();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
