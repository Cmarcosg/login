import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../market/productos.service';
import { IMG_URL } from '../market/constantes';
import { Router, ActivatedRoute } from '@angular/router';
import { Productos } from 'src/modelo/productos';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})

export class marketComponent implements OnInit {

  products: any;
  product!: Observable<Productos[]>;
  selectedId = 0;

  constructor(private productosservice: ProductosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.productosservice.getproducts().subscribe(Response => {
      this.products = Response;
      console.log(this.products);
    })
    
    this.product = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = parseInt(params.get('idProduct')!);
        return this.productosservice.getproducts();
      })
    );
  }

  getImgUrl(currentproductUri) {
    console.log(currentproductUri);
    return `${IMG_URL.productsUri}${currentproductUri}`;
  }
}
