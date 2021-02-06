import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {
  }

  setActive(index){
    
    let tabs = document.getElementsByClassName('tab-id');
    for(var i=0; i<tabs.length; i++){
      tabs[i].classList.remove('active');
    }
    tabs[index].classList.add('active');
  }

}
