import { Angebot, AngeboteService } from './../services/angebote.service';
import { Observable } from 'rxjs';
import { PushService } from './../services/push.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  private deals: Observable<Angebot[]>;
   
  constructor(private pushService: PushService, private dealServcie: AngeboteService) {}

  ngOnInit() {
    this.deals = this.dealServcie.getDeals();
  }

  test(){
    console.log(this.deals);
  }


}
