import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductosService } from '../market/productos.service';
import { Productos } from 'src/modelo/productos';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-idproduct',
  templateUrl: './idproduct.component.html',
  styleUrls: ['./idproduct.component.scss'],
})
export class IdproductComponent implements OnInit {

  products: any;

  constructor(private productosservice: ProductosService, private modalcontroller: ModalController) { }

  @Input() idproduct: string;
  @Input() productname: string;
  @Input() productprice: string;
  @Input() productdescription: string;
  @Input() img: string;

  ngOnInit() {
    this.getProductsById();
  }

  getProductsById() {
    this.productosservice.getidproducts(this.idproduct).subscribe(Response => {
      this.products = Response;
      console.log(this.products);

    })
  }

  async closeModal() {
    await this.modalcontroller.dismiss();
  }

}
