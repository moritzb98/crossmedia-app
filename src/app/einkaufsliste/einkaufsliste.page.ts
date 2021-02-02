import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-einkaufsliste',
  templateUrl: './einkaufsliste.page.html',
  styleUrls: ['./einkaufsliste.page.scss'],
})
export class EinkaufslistePage implements OnInit {
  Listitems = [];
  itemAdd;
  constructor() { }

  ngOnInit() {
  }

  additem() {
    this.Listitems.push(this.itemAdd);
    this.itemAdd = "";
  }

}
