import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Route} from '@angular/router';
import {ProductosService} from '../market/productos.service';


@Component({
  selector: 'app-idproduct',
  templateUrl: './idproduct.component.html',
  styleUrls: ['./idproduct.component.scss'],
})
export class IdproductComponent implements OnInit {

  public product: any = {};

  constructor(private route: ActivatedRoute,private productosservice:ProductosService) { }

  ngOnInit() {
  }
}
