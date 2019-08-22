import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project Product Management';
  tabs: any = [
    { name: "Home", route: "", active: true },
    { name: "Product List", route: "products", active: false },
    { name: "Product Creation", route: "create", active: false }
  ]

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInIt() {
    this.route.url.subscribe(url => {
      console.log(url);
    })
  }
  
  setActive(tab_index: number) {
    
    this.tabs[tab_index].active = true;
    for (let i = 0; i < this.tabs.length; i++) {
      if (i !== tab_index) {
        this.tabs[i].active = false;
      }
    }
  }
}
