import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DiscoverPage } from '../pages/discover/discover';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = DiscoverPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen
    , private network: Network, private toastCtrl: ToastController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkNewtwork();
    });
  }
  checkNewtwork() {
    // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'You are offline, check your internet connection.',
        duration: 3000,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Close'
      });
    
      toast.present();
    });

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'You are back!, enjoy the app.',
        duration: 3000,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Close'
      });
    
      toast.present();

    });
  }
}
