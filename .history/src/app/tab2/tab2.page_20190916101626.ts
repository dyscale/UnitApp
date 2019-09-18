import { ExpandMixComponent } from './../components/expand-mix/expand-mix.component';
import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ResultComponent } from '../components/result/result.component';
import { GetApiService } from '../providers/services/get-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  mixs: any;
  isMix: boolean = false;

  constructor(
    public modalCtrl: ModalController,
    public activateroute: ActivatedRoute,
    public getapi: GetApiService,

  ) {
    this.activateroute.params.subscribe((data: any) => {
      if(data.id !== undefined) {
        this.getapi.mixDetails(data.id).subscribe((res: any) => {
          this.mixs = res;
          console.log(res);
          this.isMix = true;
        });
      }
    });
  }

  async presentResult() {
    const modal = await this.modalCtrl.create({
      component: ResultComponent,
    });
    await modal.present();
  }
  
  async presentExpand() {
    const modal = await this.modalCtrl.create({
      component: ExpandMixComponent,
      componentProps: { channels: this.channels }
    });
    await modal.present();
  }

}