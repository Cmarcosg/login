import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ProductosService } from '../market/productos.service';
import { IMG_URL } from '../market/constantes';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IdproductComponent } from '../idproduct/idproduct.component';
import { CartComponent } from '../cart/cart.component';
@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})

export class marketComponent implements OnInit {

  products: any;
  constructor(private productosservice: ProductosService, private router: Router, private route: ActivatedRoute,private modalCtrl:ModalController) { }

   async openModal(product){
    const modal = await this.modalCtrl.create({
      component: IdproductComponent,
      componentProps:{
        idproduct : product.idProduct,
        productname :product.productName,
        productprice : product.price,
        productdescription : product.productDescription,
        img: this.getImgUrl(product.imgUrl)
      }
    });
    await modal.present();
  }

  async abrircarrito() {
    let modal = await this.modalCtrl.create({
      component: CartComponent,
      cssClass: 'cart-modal'
    });
    modal.present();
  }
  ngOnInit() {

    this.productosservice.getproducts().subscribe(Response => {
      this.products = Response;
      console.log(this.products);
    })
  }

  getImgUrl(currentproductUri) {
    console.log(currentproductUri);
    return `${IMG_URL.productsUri}${currentproductUri}`;
  }

  addProductToCart(product) {
    
  }
}
