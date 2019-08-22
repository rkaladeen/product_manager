import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../app.component.scss']
})
export class NavComponent {
  title = 'Product Management';
  tabs: any = [
    { name: "Home", route: ""},
    { name: "Product List", route: "products"},
    { name: "Product Creation", route: "create"}
  ] 
}
