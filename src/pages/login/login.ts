import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private passwordType: string = 'password';
  private iconType: string = 'ios-eye-outline';
  private loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private userProvider: UserProvider,
    private alert: AlertController,
    private menu: MenuController
  ) {}

  ngOnInit () {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  showPassword () {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.iconType = this.iconType === 'ios-eye-outline' ? 'ios-eye-off-outline' : 'ios-eye-outline';
  }

  signIn () {
    let user = {
      userName: this.loginForm.value['username'],
      password: this.loginForm.value['password']
    };

    this.userProvider.authenticate(user).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      this.menu.enable(true);
      this.navCtrl.setRoot('HomePage');
    }, error => {
        console.error(error.message);
        this.alert.create({
          title: 'Falha ao fazer login!',
          message: 'Aconteceu algo de errado',
          buttons: ['Ok']
        }).present();
    });
  }

  register() {
    this.navCtrl.setRoot('RegisterPage', {}, { animate: true, direction: 'forward' });
  }

}
