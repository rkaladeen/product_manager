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
  heading: string;
  buttons: object;
  newProduct: FormGroup;
  currentProduct: any = [];
  globalId: any;
  failedBackEnd: any = false;
  backEndErrors: any = {};
  
  constructor(private _route: ActivatedRoute, 
              private _http: HttpService, 
              private _router: Router) { }

  ngOnInit() {
    this.getProductFromUrl();
    this.newProduct = new FormGroup({
      _id: new FormControl(''),
      title: new FormControl('', 
                            [
                              Validators.required, 
                              Validators.minLength(5)
                            ]),
      price: new FormControl('', 
                            [
                              Validators.required,  
                              Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$')
                            ]),
      img_url: new FormControl('', 
                              [
                                Validators.required  
                              ])
      
    })
  }

  getProductFromUrl() {
    this._route.params.subscribe(prod_id => {
      this.globalId = prod_id;
      if (Object.keys(prod_id).length != 0) {
        let prodData = this._http.getOne(prod_id.prod_id)
        prodData.subscribe((data: any) => {
          if (data.name != "ValidationError") {
            this.newProduct.setValue({
              _id: data['_id'],
              title: data['title'],
              price: data['price'],
              img_url: data['img_url']
            }) 
          }
        })
      }

    })
    this._route.data.subscribe(data => {
      this.buttons = data.buttons;
      this.heading = data.title;
    })
  }

  serverValidator(data: any):void{
    if (data.name == "ValidationError") {
      this.backEndErrors = data.errors;
      this.failedBackEnd = true;
    } else {
      this._router.navigate(['/products']);
    }
  }

  submitProduct(): void {
    delete this.newProduct.value._id;
    let ob = this._http.createProduct(this.newProduct.value);
    ob.subscribe((data: any) => {
      this.serverValidator(data);
    })
  }

  editProduct(): void {
    let ob = this._http.updateProduct(this.newProduct.value);
    ob.subscribe((data: any) => {
      this.serverValidator(data);
    })
  }

  deleteProduct() {
    let ob = this._http.deleteProduct(this.newProduct.value._id)
    ob.subscribe((data: any) => {
      this.serverValidator(data);
    })
  }

}
