import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "products", component: AllProductsComponent },

  { 
    path: "create", 
    component: AddProductComponent, 
    data: { 
      title: "Create Product",
      buttons: {create: "Create", cancel: "Cancel"}
    } 
  },
  
  { 
    path: "update/:prod_id", 
    component: AddProductComponent, 
    data: { 
      title: "Edit Product",
      buttons: {update: "Update", delete: "Delete"}
    } 
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
