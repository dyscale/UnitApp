import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { GetApiService } from '../providers/services/get-api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { PostApiService } from '../providers/services/post-api.service';
import { SupportService } from '../providers/services/support.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  DEVICEID = environment.device_id;

  action = false;
  blank=false;
  items: any;
  arrays: number[] = [];

  constructor(
    public getapi: GetApiService,
    private storage: Storage,
    public router: Router,
    private postapi: PostApiService,
    public support:SupportService,

  ) {}

  ionViewWillEnter(){
    this.storage.get(this.DEVICEID).then(device => {
      this.getapi.favorites(device).subscribe((res) => {
        this.items = res;
      });
    });
  }

  indexDelete(res){
    let index=this.items.findIndex(item => item.id===res);
    this.items[index].id*=-1;    

  }

  hapus(){
    
    this.items=this.items.filter((res)=>{
      if(res.id < 0) {
        let id = res.id * -1;
        this.postapi.updateFavorte(id, {bool: 0}).subscribe(_ => {
          this.support.presentToast("즐겨찾기에서 해제되었습니다.");
        });
      }
      return res.id>0
    })
    if(this.items.length===0) this.blank=true;
    
  }

  movetab2(id) {
    this.router.navigate( [`/app/tabs/tab2`, {id: id}]);
  }

}
