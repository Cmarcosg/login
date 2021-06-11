import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProductosService} from '../market/productos.service';
import { switchMap } from 'rxjs/operators';
import { Productos } from 'src/modelo/productos';

@Component({
  selector: 'app-idproduct',
  templateUrl: './idproduct.component.html',
  styleUrls: ['./idproduct.component.scss'],
})
export class IdproductComponent implements OnInit {



  constructor(  private route: ActivatedRoute,private router: Router,private productosservice:ProductosService) { }

  ngOnInit() {
   
  }
 
}
