import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GetApiService } from 'src/app/providers/services/get-api.service';
import { environment } from 'src/environments/environment.prod';
import { Storage } from '@ionic/storage';
import { SupportService } from 'src/app/providers/services/support.service';

@Component({
  selector: 'app-mix-list',
  templateUrl: './mix-list.page.html',
  styleUrls: ['./mix-list.page.scss'],
})
export class MixListPage implements OnInit {

  DEVICEID = environment.device_id;
  mixs: any;
  isFavorite = false;

  constructor(
    public getapi: GetApiService,
    private storage: Storage,
    public router: Router,
    private support: SupportService,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get(this.DEVICEID).then(device => {
      this.getapi.mixList(device).subscribe((res) => {
        this.mixs = res;
      });
    });
  }

  toggleFavorite(id) {
    if (this.support.hasFavorite(id)) {
      this.support.removeFavorite(id);
      this.isFavorite = false;
    } else {
      this.support.addFavorite(id);
      this.isFavorite = true;
    }
  }

  movetab2(id) {
    this.router.navigate( [`/tabs/tab2`, {id: id}]);
  }

}
