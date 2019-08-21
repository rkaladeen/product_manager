import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from '../http.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['../app.component.scss']
})

export class AddProductComponent implements OnInit {
  title: string;
  buttons: object;
  newProduct: FormGroup;
  currentProduct: any;
  globalId:any;
  
  constructor(private route: ActivatedRoute, private _http: HttpService, private router: Router) { }

  ngOnInit() {
    this.newProduct = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'img_url': new FormControl(null, [Validators.required])
    })

    this.getProdFromUrl();
  }

  getProdFromUrl() {
    this.route.params.subscribe(prod_id => {
      this.globalId = prod_id;
      let prodData = this._http.getOne(prod_id.prod_id)
      prodData.subscribe(data => {
        this.currentProduct = data;
        console.log(data);
      })
    })
    this.route.data.subscribe(data => {
      this.buttons = data.buttons;
      this.title = data.title;
      // console.log(data);
    })
  }

  submitProduct(): void {
    let product = {
      'title': this.newProduct['title'],
      'price': this.newProduct['price'],
      'img_url': this.newProduct['img_url']
    }
    let ob = this._http.createProduct(product);
    ob.subscribe(data => {
      // console.log(data);
      this.router.navigate(['/']);
    })
  }
// This may not work
  editProduct(): void {
    let product = {
      '_id': this.globalId.prod_id,
      'title': this.newProduct['title'],
      'price': this.newProduct['price'],
      'img_url': this.newProduct['img_url']
    }
    let ob = this._http.updateProduct(product);
    ob.subscribe(data => {
      console.log(data);
      this.router.navigate(['/']);
    })
  }

  deleteProduct(prod_id: any) {
    let ob = this._http.deleteProduct(prod_id)
    ob.subscribe(data => {
      // console.log(data);
      this.router.navigate(['/']);
    })
  }

}
