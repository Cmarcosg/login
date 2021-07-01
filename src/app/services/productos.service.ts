import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe  }  from 'rxjs';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  productos: any;
  
  constructor(private http: HttpClient) { }

  getproducts(): Observable<any>{
    return this.http.get('https://www.clusterbeat.com/market/API/index.php?a=getProductsByTypeId&typeId=1').pipe();
  }
  
  getidproducts(idProduct): Observable<any>{
    return this.http.get('https://www.clusterbeat.com/market/API/index.php?a=getProductById&idProduct='+idProduct).pipe();
  }
  
  getProducts() {
    return this.productos;
  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProductToCart(product) {
    console.log(this.cart);
    const foundItem = this.cart.find((p)=> p.idProduct === product.idpProduct );
    if(foundItem) {
      foundItem.amount ++;
    }
    if (foundItem===undefined) {
      product.amount = 1;
      this.cart.push(product);
    }
  }
  decreaseProduct(product) {
    console.log(this.cart);
    for (let [index, p] of this.cart.entries()) {
      if (p.idProduct === product.idProduct) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.idProduct === product.idProduct) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
  
}
