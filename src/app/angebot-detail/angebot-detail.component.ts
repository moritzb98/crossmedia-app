import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngeboteService, Angebot } from '../services/angebote.service';

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
  }

  constructor(private activatedRouter: ActivatedRoute, private dealService: AngeboteService) { }

  ngOnInit() {
    let id = this.activatedRouter.snapshot.paramMap.get('id');
    if(id){
      this.dealService.getDeal(id).subscribe(deal => {
        this.deal = deal;
      })
    }
  }

}
