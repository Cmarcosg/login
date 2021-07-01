import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Productos } from 'src/modelo/productos';
import { StorageCartService } from 'src/app/services/storageCart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cart: Productos[] = [];
  
  constructor(private productosservice: ProductosService, private modalCtrl: ModalController,private alertCtrl: AlertController,private storageService : StorageCartService) { }
 
 ngOnInit() {
    this.setCart();
    
  }
  
  async setCart(){
  this.cart = await this.storageService.getCart();
  }

  decreaseCartItem(product) {
    this.productosservice.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.productosservice.addProductToCart(product);
  }

 
  removeCartItem(product) {
    this.productosservice.removeProduct(product);
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
 
  async checkout() {
 
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}

