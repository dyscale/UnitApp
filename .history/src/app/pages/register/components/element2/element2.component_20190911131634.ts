import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormDataService } from 'src/app/providers/services/formData.service';
import { Element2 } from 'src/app/providers/models/formData.model';

@Component({
  selector: 'app-element2',
  templateUrl: './element2.component.html',
  styleUrls: ['./element2.component.scss']
})
export class Element2Component implements OnInit {

  @Input() formData;
  element2: Element2;

  sUnit: number;
  sDensity: string;
  gUnit: number;
  gDensity: string;
  adUnit: number;
  adDensity: string;

  constructor(
    private router: Router,
    private formDataService: FormDataService
  ) { }

  ngOnInit() {
    this.formData = this.formDataService.getFormData();
    this.element2 = this.formDataService.getElement2();

  }

  save(form: any): boolean {
    if (!form.valid) {
        return false;
    }
    
    this.formDataService.setElement2(this.element2);
    return true;
  }

  goToPrevious(form: any) {
    if (this.save(form)) {
        // Navigate to the personal page
        this.router.navigate(['/register/element']);
    }
  }

  goToNext(form: any) {
    if(this.save(form)) {
    this.router.navigate(['/register/percentage']);
    }
  }

  calc(ev) {
    let name = ev.target.name;
    let s1_unit = Number(this.element2.s1_unit),
        s2_unit = Number(this.element2.s2_unit),
        s3_unit = Number(this.element2.s3_unit),
        g1_unit = Number(this.element2.g1_unit),
        g2_unit = Number(this.element2.g2_unit),
        g3_unit = Number(this.element2.g3_unit),
        ad1_unit = Number(this.element2.ad1_unit),
        ad2_unit = Number(this.element2.ad2_unit),
        ad3_unit = Number(this.element2.ad3_unit),
        s1_density = Number(this.element2.s1_density),
        s2_density = Number(this.element2.s2_density),
        s3_density = Number(this.element2.s3_density),
        g1_density = Number(this.element2.g1_density),
        g2_density = Number(this.element2.g2_density),
        g3_density = Number(this.element2.g3_density),
        ad1_density = Number(this.element2.ad1_density),
        ad2_density = Number(this.element2.ad2_density),
        ad3_density = Number(this.element2.ad3_density);
  }

}
