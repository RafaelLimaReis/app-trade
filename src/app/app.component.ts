import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      let value = localStorage.getItem('user');

      if (value) {
        this.rootPage = 'HomePage';
        menu.enable(true);
      } else {
        menu.enable(false);
        this.rootPage = 'LoginPage';
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.menu.close();
    this.menu.enable(false);
    this.nav.setRoot('LoginPage');
  }
}

