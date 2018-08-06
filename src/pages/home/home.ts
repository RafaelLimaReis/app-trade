import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public products: Array<any>;

  constructor(
    private product: ProductProvider
  ) {
    this.findAllProducts();
  }

  ionViewDidLoad() {
    console.log('carregando..');
  }

  findAllProducts() {
    this.product.listProducts().subscribe(response => {
      this.products = response.data;
    }, err => {
      console.log(err);
    });
  }

}
