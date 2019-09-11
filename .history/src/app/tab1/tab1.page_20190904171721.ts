import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GetApiService } from '../providers/services/get-api.service';
import { environment } from 'src/environments/environment.prod';
import * as moment from 'moment';

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

  today : string;
  yesterday : string;

  loggerForm: FormGroup;

  sliderOptions={
    slidesPerView:2.4
  }

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private storage: Storage,
    public getapi: GetApiService,

  ) {

    this.today = moment().format("YYYY-MM-DD");
    this.yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD");
    
  }

  ionViewDidEnter(){
    this.getInquiry();
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
        this.mixRegisters = res.reverse().filter((item, index) => index < 4 );
        this.mixs = res;
      });
    });
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

    this.navCtrl.navigateForward(['/time-series', this.loggerForm.value]);
    
  }


}
