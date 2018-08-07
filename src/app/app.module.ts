import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { UserProvider } from '../providers/user/user';
import { ProductProvider } from '../providers/product/product';
import { HttpClientModule } from '@angular/common/http';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ConfigsApi } from '../providers/ConfigsApi';
import { ViaCepProvider } from '../providers/via-cep/via-cep';
import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Camera,
    FileTransfer,
    Facebook,
    StatusBar,
    SplashScreen,
    UserProvider,
    ConfigsApi,
    ProductProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ViaCepProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
