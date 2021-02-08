import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-einkaufsliste',
  templateUrl: './einkaufsliste.page.html',
  styleUrls: ['./einkaufsliste.page.scss'],
})
export class EinkaufslistePage implements OnInit {
  public form = [
    { val: 'Äpfel', isChecked: true },
    { val: 'Vollkornnudeln', isChecked: false },
  ];
  itemAdd;
  constructor() { }

  ngOnInit() {
  }

  additem() {
    this.form.push({val: this.itemAdd, isChecked: false});
    this.itemAdd = '';
  }

}
