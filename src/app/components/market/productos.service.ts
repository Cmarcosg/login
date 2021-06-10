import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe  }  from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  
  constructor(private http: HttpClient) { }

  getproducts(): Observable<any>{
    return this.http.get('https://www.clusterbeat.com/market/API/index.php?a=getProductsByTypeId&typeId=1').pipe();
  }

}
