import { EditMixComponent } from './../components/edit-mix/edit-mix.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GetApiService } from '../providers/services/get-api.service';
import { environment } from 'src/environments/environment.prod';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SupportService } from '../providers/services/support.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  DEVICEID = environment.device_id;

  companies : any;
  contractors : any;
  sites : any;
  mixs : any;

  mixRegisters : any;
  results : any;

  today : string;
  yesterday : string;

  loggerForm: FormGroup;

  sliderOptions={
    slidesPerView:2.4
  }

  blankMix=false;
  blankResult=false;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private storage: Storage,
    public getapi: GetApiService,
    public router: Router,
    private support: SupportService,
    public modalCtrl: ModalController,

    private appUpdate: AppUpdate,
    private appVersion: AppVersion,
    public plt: Platform,

  ) {
    this.updateApp();
    
  }

  ionViewDidEnter(){
    this.getInquiry();

    this.today = moment().format("YYYY-MM-DD");
    this.yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD");

  }

  ngOnInit() {

    this.loggerForm =  this.formBuilder.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      company: ['', [Validators.required]],
      contractor: ['', [Validators.required]],
      site: ['', [Validators.required]],
      mixnum: ['', [Validators.required]]

    });
  }

  updateApp() {
    const updateUrl = 'http://download.dymeter.com/download/unit-update.xml';
    this.appUpdate.checkAppUpdate(updateUrl).then(update => {
      alert("업데이트알림  "+update.msg);
    }).catch(error=>{
      console.log("Error: "+error.msg);
    });

  }

  getInquiry() {
    this.storage.get(this.DEVICEID).then(device => {
      this.getapi.getCompany(device).subscribe((res) => {
        this.companies = res;
      });
      this.getapi.getContractor(device).subscribe((res) => {
        this.contractors = res;
      });
      this.getapi.getSite(device).subscribe((res) => {
        this.sites = res;
      });
      this.getapi.mixList(device).subscribe((res) => {
        if(res.length===0) this.blankMix=true;
        
        this.mixRegisters = res.reverse().filter((item, index) => index < 4 );
        this.mixs = res;
        
      });
      this.getapi.completeList(device).subscribe((res) => {
        if(res.length===0) this.blankResult=true;

        this.results = res.reverse().filter((item, index) => index < 6 );
      });

    });
  }

  async presentEditMix(mixid) {
    const modal = await this.modalCtrl.create({
      component: EditMixComponent,
    });
    await modal.present();
  }

  onSubmit() {

    /*
    const startDate = this.loggerForm.controls['start'].value;
    const endDate = this.loggerForm.controls['end'].value;
    const _company = this.loggerForm.controls['company'].value;
    const _contractor = this.loggerForm.controls['contractor'].value;
    const _site = this.loggerForm.controls['site'].value;
    const _mixnum = this.loggerForm.controls['mixnum'].value;

    this.navCtrl.navigateForward([`/time-series`, {
      start: startDate, 
      end: endDate,
      company: _company,
      contractor: _contractor,
      site: _site,
      mixnum: _mixnum
    }]);
    */

     
    const startDate = this.loggerForm.controls['start'].value;
    const endDate = this.loggerForm.controls['end'].value;
    
    if (startDate > endDate) {
      this.support.showAlert("날짜설정이 잘못되었습니다.");
      return;
    } else {
      this.navCtrl.navigateForward(['/time-series', this.loggerForm.value]);
    }

    
  }

  movetab2(id) {
    this.router.navigate( [`/tabs/tab2`, {id: id}]);
  }


}