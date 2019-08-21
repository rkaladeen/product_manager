import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['../app.component.scss']
})
export class AllProductsComponent implements OnInit {
  title: string = "Products List"
  allProducts: any;
  constructor(private _http: HttpService) { }

  ngOnInit() {
    let ob = this._http.getAll();
    ob.subscribe(data => {
      console.log(data);
      this.allProducts = data;
    })
  }

  deleteProduct(prod_id: any) {
    let ob = this._http.deleteProduct(prod_id)
    ob.subscribe(data => {
      console.log(data);
      this.ngOnInit();
    })
  }

}
