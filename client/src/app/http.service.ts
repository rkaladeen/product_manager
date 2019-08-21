import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { }

  getAll() {
    return this._http.get("/products");
  }

  getOne(prod_id: any) {
    return this._http.get(`/products/${prod_id}`);
  }

  createProduct(data: object) {
    return this._http.post("/products", data);
  }

  updateProduct(data: object) {
    return this._http.put(`/products/${data['_id']}`, data);
  }

  deleteProduct(prod_id: string) {
    return this._http.delete(`/products/${prod_id}`);
  }

}