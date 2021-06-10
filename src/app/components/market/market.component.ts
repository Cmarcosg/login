import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../market/productos.service';
import { IMG_URL } from '../market/constantes';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})

export class marketComponent implements OnInit {

  products: any;

  constructor(private productosservice: ProductosService, private router: Router, private route: ActivatedRoute) { }

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
}
