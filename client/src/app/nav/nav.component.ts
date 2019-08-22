import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../app.component.scss']
})
export class NavComponent implements OnInit {
  title = 'Project Product Management';
  tabs: any = [
    { name: "Home", route: ""},
    { name: "Product List", route: "products"},
    { name: "Product Creation", route: "create"}
  ]

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  
  }
  
  
}
