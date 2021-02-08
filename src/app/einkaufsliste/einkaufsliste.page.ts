import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-einkaufsliste',
  templateUrl: './einkaufsliste.page.html',
  styleUrls: ['./einkaufsliste.page.scss'],
})
export class EinkaufslistePage implements OnInit {
  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
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
