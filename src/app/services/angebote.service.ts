import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Angebot {
  id?: string,
  title: string,
  content: string,
  store: string,
  price_new: string,
  price_old: string,
  category: string,
  img: string,
}

@Injectable({
  providedIn: 'root'
})
export class AngeboteService {

  private deals: Observable<Angebot[]>;
  private dealCollection: AngularFirestoreCollection<Angebot>;

  constructor(private afs: AngularFirestore) {
      this.dealCollection = this.afs.collection<Angebot>('deals');
      this.deals = this.dealCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
   }

   getDeals(): Observable<Angebot[]> {
     return this.deals;
   }

   getDeal(id: string): Observable<Angebot> {
    return this.dealCollection.doc<Angebot>(id).valueChanges().pipe(
      take(1),
      map(deal => {
        deal.id = id;
        return deal;
      })
    );
  }

  addDeal(deal: Angebot): Promise<DocumentReference> {
    return this.dealCollection.add(deal);
  }

  updateDeal(deal: Angebot): Promise<void> {
    return this.dealCollection.doc(deal.id).update({ title: deal.title, content: deal.content, price_new: deal.price_new });
  }

  deleteDeal(id: string): Promise<void> {
    return this.dealCollection.doc(id).delete();
  }
}
