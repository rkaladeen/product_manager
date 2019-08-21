import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.scss']
})
export class HomeComponent implements OnInit {
  title: string = "Home Page"
  text: string = "Welcome to Project Product Management! Here we can manage a set of products. You are able to create products, remove old products, and edit products."
  
  constructor() { }
  ngOnInit() { }

  

}
