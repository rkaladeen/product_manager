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
  currentProduct: any;
  globalId: any;
  
  constructor(private route: ActivatedRoute, private _http: HttpService, private router: Router) { }

  ngOnInit() {
    this.getProdFromUrl();
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

  getProdFromUrl() {
    this.route.params.subscribe(prod_id => {
      this.globalId = prod_id;
      console.log(prod_id);
      if (Object.keys(prod_id).length != 0) {
        console.log("Your are in Update form")
        let prodData = this._http.getOne(prod_id.prod_id)
        prodData.subscribe(data => {
          this.newProduct.setValue({
            _id: data['_id'],
            title: data['title'],
            price: data['price'],
            img_url: data['img_url']
          }) 
          // console.log(data);
        })
      }

    })
    this.route.data.subscribe(data => {
      this.buttons = data.buttons;
      this.heading = data.title;
      // console.log(data);
    })
  }

  submitProduct(): void {
    console.log("Submit Clicked!!!")
    delete this.newProduct.value._id;
    console.log(this.newProduct.value);
    let ob = this._http.createProduct(this.newProduct.value);
    ob.subscribe(data => {
      console.log(data);
      this.router.navigate(['/products']);
    })
  }
// This may not work
  editProduct(): void {
    console.log("Edit Clicked!!!")
    console.log(this.newProduct.value);
    let ob = this._http.updateProduct(this.newProduct.value);
    ob.subscribe(data => {
      console.log(data);
      this.router.navigate(['/products']);
    })
  }

  deleteProduct() {
    let ob = this._http.deleteProduct(this.newProduct.value._id)
    ob.subscribe(data => {
      // console.log(data);
      this.router.navigate(['/products']);
    })
  }

}
