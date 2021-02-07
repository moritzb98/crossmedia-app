import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss'],
})
export class EinstellungenComponent implements OnInit {
  constructor() { }
  rootPage: any;
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnInit() {}

}

