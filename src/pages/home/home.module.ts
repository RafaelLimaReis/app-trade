import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ListProductsComponent } from '../../components/list-products/list-products';

@NgModule({
  declarations: [
    HomePage,
    ListProductsComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
