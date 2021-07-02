import { Component,ElementRef,OnInit,ViewChild,} from '@angular/core';
import { ProductosService} from '../../services/productos.service';
import { IMG_URL} from '../market/constantes';
import { Router, ActivatedRoute} from '@angular/router';
import { MenuController, ModalController} from '@ionic/angular';
import {IdproductComponent} from '../idproduct/idproduct.component';
import {  CartComponent } from '../cart/cart.component';
import { StorageCartService  } from 'src/app/services/storageCart.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})

export class marketComponent implements OnInit {

  products: any;
  cartArray : any;
  cartItemCount: BehaviorSubject<number>;

  menuOpen: boolean = true;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  
  constructor(private storageService: StorageCartService, 
    private productosservice: ProductosService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private modalCtrl: ModalController, 
    private menu: MenuController){}

  async openModal(product) {
    const modal = await this.modalCtrl.create({
      component: IdproductComponent,
      componentProps: {
        idproduct: product.idProduct,
        productname: product.productName,
        productprice: product.price,
        productdescription: product.productDescription,
        img: this.getImgUrl(product.imgUrl)
      }
    });
    await modal.present();
  }


  async OpenCart() {
    let modal = await this.modalCtrl.create({
      component: CartComponent,
      cssClass: 'cart-modal'
    });
    modal.present();
  }
  ngOnInit() {

    this.productosservice.getproducts().subscribe(Response => {
      this.products = Response;
    })
    
    this.cartArray = this.productosservice.getproducts();

    this.cartItemCount= this.productosservice.getCartItemCount();

  }
  toogleMenu() {
    this.menuOpen ? this.menu.open("first") : this.menu.close();
    this.menuOpen = !this.menuOpen;
  }
  getImgUrl(currentproductUri) {
    return `${IMG_URL.productsUri}${currentproductUri}`;
  }

  addProduct(product){
    this.productosservice.addProductToCart(product);
    this.storageService.updateLocalStorage("cart",this.cartArray)
    
  }
  removeproduct(product){
    this.productosservice.decreaseProduct(product);
    this.storageService.updateLocalStorage("cart",this.cartArray)
    
  }
  
 
  async openCart() {
    let modal = await this.modalCtrl.create({
      component: CartComponent,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
    });
    modal.present();
  }
}
