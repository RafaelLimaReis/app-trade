import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { ProductProvider } from '../../providers/product/product';

/**
 * Generated class for the InfoOfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-offer',
  templateUrl: 'info-offer.html',
})
export class InfoOfferPage {

  private offer;
  private user = JSON.parse(localStorage.getItem('user')).id;
  private start;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private imageCtrl: ImageViewerController,
    private alertCtrl: AlertController
  ) {
    this.offer = this.navParams.get('offer');
    this.start = this.user == this.offer.id_firstUser ? 'me' : 'other';
  }

  ionViewDidLoad() {
    console.log(this.offer);
  }

  zoomImage(productImage)
  {
    this.imageCtrl.create(productImage).present();
  }

  refuseOffer(id) {
    this.productProvider.refuseOffer(id).subscribe(response =>
      this.alertCtrl.create({
        title: 'Aviso',
        subTitle: 'Sua oferta foi recusada e não pode ser mais alterada!',
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }]
      }).present()
    ,err => console.log(err));
  }

}