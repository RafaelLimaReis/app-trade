import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';

@Component({
  selector: 'list-products',
  templateUrl: 'list-products.html'
})
export class ListProductsComponent {

  @Input() products: Array<any>;

  constructor(
    private modalCtrl: ModalController,
    private productProvider: ProductProvider,
    private toastCtrl: ToastController
  ) {}

  openDetail(product) {
    let modalPage = this.modalCtrl.create('ModalDetailProductPage', { product:product });
    modalPage.present();
  }

  likeProduct(event) {
    if (event.target.children[0].getAttribute('ng-reflect-name') === 'heart-outline') {
      this.productProvider.likeProduct(event.target.children[0].id).subscribe(result => {
      event.target.children[0].classList.add('ion-md-heart');
      event.target.children[0].classList.remove('ion-md-heart-outline');
      event.target.children[0].setAttribute('ng-reflect-name', 'heart');
      this.toastCtrl.create({
        message: 'Adicionado aos favoritos!',
        duration: 3000,
        position: 'bottom'
      }).present();
      }, err => console.log(err));
    } else {
      this.productProvider.deslikeProduct(event.target.children[0].id).subscribe(result => {
        event.target.children[0].classList.add('ion-md-heart-outline');
        event.target.children[0].classList.remove('ion-md-heart');
        event.target.children[0].setAttribute('ng-reflect-name', 'heart-outline');
        this.toastCtrl.create({
          message: 'Removido dos favoritos!',
          duration: 3000,
          position: 'bottom'
        }).present();
      }, err => console.log(err));
    }
  }
}
