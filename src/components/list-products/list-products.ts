import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'list-products',
  templateUrl: 'list-products.html'
})
export class ListProductsComponent {

  @Input() products: Array<any>;

  constructor(private modalCtrl: ModalController) {}

  openDetail(product) {
    let modalPage = this.modalCtrl.create('ModalDetailProductPage', { product:product });
    modalPage.present();
  }

  likeProduct(event) {
    debugger;
    console.log(event.target);
  }
}
