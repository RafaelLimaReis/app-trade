import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { ViaCepProvider } from '../../providers/via-cep/via-cep';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private userForm: FormGroup;
  public addressForm: FormGroup;
  private image = null;
  public formNumber: number = 1;
  private passwordType: string = 'password';
  private iconType: string = 'ios-eye-outline';
  private dotClass = {
    step1: 'dot dot__select',
    step2: 'dot dot__not',
    step3: 'dot dot__not'
  }

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private userProvider: UserProvider,
    private adressProvider: ViaCepProvider,
    public camera: Camera,
    private loadCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.addressForm = this.formBuilder.group({
      cep: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  showPassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.iconType = this.iconType === 'ios-eye-outline' ? 'ios-eye-off-outline' : 'ios-eye-outline';
  }

  nextAddress() {
    this.formNumber++;
    this.dotClass.step2 = this.dotClass.step1;
  }

  register() {
    this.dotClass.step3 = this.dotClass.step1;
    this.formNumber++;

    let user = {
      name: this.userForm.value['name'],
      lastname: this.userForm.value['lastname'],
      username: this.userForm.value['username'],
      email: this.userForm.value['email'],
      password: this.userForm.value['password'],
      address: {
        cep: this.addressForm.value['cep'],
        street: this.addressForm.value['street'],
        number: this.addressForm.value['number'],
        district: this.addressForm.value['district'],
        city: this.addressForm.value['city'],
        state: this.addressForm.value['state']
      }
    }

    this.userProvider.register(user, this.image).then(res => {
      console.log(res);
    }).catch(error => console.error(JSON.stringify(error)));
  }

  takePicture() {

    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: false
    };

    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData;
    });
  }

  getAdress(cep: number) {
    let spinner = this.loadCtrl.create({
      content: 'Buscando endereço',
      spinner: 'crescent'
    });

    spinner.present();

    this.adressProvider.getAdress(cep).subscribe(response => {
      this.addressForm.controls['street'].setValue(response.logradouro);
      this.addressForm.controls['district'].setValue(response.bairro);
      this.addressForm.controls['city'].setValue(response.localidade);
      this.addressForm.controls['state'].setValue(response.uf);
      spinner.dismiss();
    }, err => {
      if (err.status === 404) {
        this.alertCtrl.create({
          title: 'Não foi encontrado nenhum endereço!',
          message: 'Tente novamente.',
          buttons: ['Ok']
        }).present();
        spinner.dismiss();
      }
    });
  }

  goToLogin() {
    this.navCtrl.setRoot('LoginPage', {}, { animate: true, direction: 'forward' });
  }

}
