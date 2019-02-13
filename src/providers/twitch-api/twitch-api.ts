import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TwitchApiProvider {
  private sClient_ID: string = '4kqw8fumhzazkvrptfn8fy04k1pbgk';

  constructor(public http: HttpClient) {

  }

  getStreamsByName(sStreamName: any, nLimitView: any) {
    return this.http.get('https://api.twitch.tv/kraken/search/streams?query=' + sStreamName + '&limit=' + nLimitView + '&client_id=' + this.sClient_ID).toPromise();
  }

  getStreamsRandom() {
    return this.http.get('https://api.twitch.tv/kraken/streams?first=20&client_id='+ this.sClient_ID).toPromise();
  }

}
