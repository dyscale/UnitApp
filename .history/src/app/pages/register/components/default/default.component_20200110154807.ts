import { Component, OnInit } from '@angular/core';

import { environment } from './../../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Personal } from 'src/app/providers/models/formData.model';
import { FormDataService } from 'src/app/providers/services/formData.service';
import { GetApiService } from 'src/app/providers/services/get-api.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  DEVICEID = environment.device_id;

  personal: Personal;

  companies: Observable<any[]>;
  contractors: Observable<any[]>;
  sites: Observable<any[]>;

  constructor(
    private router: Router,
    private formDataService: FormDataService,
    private storage: Storage,
    public getapi: GetApiService,
  ) { 
    this.getInquiry();

  }

  ngOnInit() {
    this.personal = this.formDataService.getPersonal();

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
    });
  }

  save(form: any): boolean {
    if (!form.valid) {
        return false;
    }
        
    this.formDataService.setPersonal(this.personal);
    return true;
  }

  goToNext(form: any) {
    if(this.save(form)) {
      this.router.navigate(['/register/element']);
    }
  }


    
  doRefresh(event) {
    this.getInquiry();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  ionChange(evt) {
    console.log(evt.target.value);
    
  }

}
