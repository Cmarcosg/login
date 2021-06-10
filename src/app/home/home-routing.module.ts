import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdproductComponent } from '../components/idproduct/idproduct.component';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  { path: 'market/:idproduct', 
  component: IdproductComponent 
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
