import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Store {
  id?: string,
  name: string,
  logo: string,
  street: string,
  city: string,
  opening_hours: string,
  lat: number,
  long: number,
}

@Injectable({
  providedIn: 'root'
})
export class StoreServiceService {

  private stores: Observable<Store[]>;
  private storeCollection: AngularFirestoreCollection<Store>;

  constructor(private afs: AngularFirestore) {
    this.storeCollection = this.afs.collection<Store>('stores');
    this.stores = this.storeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
 }

  getStores(): Observable<Store[]> {
    return this.stores;
  }

  getStore(id: string): Observable<Store> {
    return this.storeCollection.doc<Store>(id).valueChanges().pipe(
      take(1),
      map(store => {
        store.id = id;
        return store;
      })
    );
  }

  addStore(store: Store): Promise<DocumentReference> {
    return this.storeCollection.add(store);
  }


}
