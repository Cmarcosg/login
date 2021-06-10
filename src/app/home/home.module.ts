import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { HomePageRoutingModule } from './home-routing.module';
import { LoginComponent } from '../components/login/login.component';
import { marketComponent } from '../components/market/market.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [HomePage, LoginComponent, marketComponent],
})
export class HomePageModule {}
