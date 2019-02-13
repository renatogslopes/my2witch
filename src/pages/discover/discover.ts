import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { TwitchApiProvider } from '../../providers/twitch-api/twitch-api';


@IonicPage()
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage {
  private nViewValue: any;
  private bViewValueChanged: boolean = false;
  private sStreamNameInput: string;
  private aStreams: any;
  private aStreamsRadom: any;
  private aStreamsSearch: any;
  private fakeStreams: any = ['', '', '', '', '', ''];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public twitchApi: TwitchApiProvider,
    public loadingCtrl: LoadingController) {

    // check the viewNumber saved on localStorage.
    this.nViewValue = localStorage.getItem('viewValue');
    if (this.nViewValue === null) {
      this.nViewValue = 30; //Set the 'default' value
      localStorage.setItem('viewValue', this.nViewValue);
    }

    this.getRandomStreams();

  }
  ionViewWillEnter() {
    this.getRandomStreams();  
  }

  getRandomStreams() {
    this.twitchApi.getStreamsRandom().then((data: any) => {
      this.aStreamsRadom = data.streams;
      this.aStreams = data.streams;
    }).catch(err => {
      alert('An Error Occurred while searching. Please try Again.');
    });
  }

  showStreamDetails(aStream: any) {
    let mContactModal = this.modalCtrl.create(DetailsPage, { aStream: aStream });
    mContactModal.present();
  }

  onSearch() {
    //Reset values.
    this.nViewValue = localStorage.getItem('viewValue');
    this.bViewValueChanged = false;

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Searching on Twitch, Please Wait...'
    });

    if (this.sStreamNameInput) {
      loading.present();
      this.twitchApi.getStreamsByName(this.sStreamNameInput, this.nViewValue).then((data: any) => {
        this.aStreamsSearch = data.streams;
        this.aStreams = data.streams;
        loading.dismiss();
      }).catch(err => {
        loading.dismiss();
        this.aStreams = this.aStreamsRadom;
        alert('An Error Occurred while searching. Please try Again.');
      });
    } else {
      this.aStreams = this.aStreamsRadom;
    }
  }

  onChangeViewNumber() {
    this.bViewValueChanged = true;
  }

  setViewNumber() {
    localStorage.setItem('viewValue', this.nViewValue);
    this.onSearch();
    this.bViewValueChanged = false;
  }

  doRefresh(refresher) {
    if (this.sStreamNameInput == null) {
      this.getRandomStreams();
    }else{
      this.onSearch();
    }
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
