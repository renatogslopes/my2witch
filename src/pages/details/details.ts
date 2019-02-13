import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  private aStreamDetails: any;
  private sStreamSrc: any;
  private sStreamWidth: any;
  private sStreamHeight: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public DomSanitizer: DomSanitizer) {

    this.aStreamDetails = this.navParams.get('aStream');
    this.sStreamSrc = DomSanitizer.bypassSecurityTrustResourceUrl('https://player.twitch.tv/?channel=' + this.aStreamDetails.channel.name + '&muted=true&autoplay=false');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
