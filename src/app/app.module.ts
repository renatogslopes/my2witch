import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';

import { DiscoverPageModule } from '../pages/discover/discover.module';
import { DetailsPageModule } from '../pages/details/details.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TwitchApiProvider } from '../providers/twitch-api/twitch-api';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    DiscoverPageModule,
    DetailsPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TwitchApiProvider,
    Network
  ]
})
export class AppModule {}
