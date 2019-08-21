import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PPM - Project Product Management';
  tabs: any = [
    { home: "Home", active: true },
    { all: "Product List", active: false },
    { add: "Product Creation", active: false }
  ]

  setActive(tab_index: number) {
    this.tabs[tab_index].active = true;
    for (let i = 0; i < this.tabs.length; i++) {
      if (i !== tab_index) {
        this.tabs[i].active = false;
      }
    }
  }
}
