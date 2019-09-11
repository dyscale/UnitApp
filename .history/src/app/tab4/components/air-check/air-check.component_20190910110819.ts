import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-air-check',
  templateUrl: './air-check.component.html',
  styleUrls: ['./air-check.component.scss']
})
export class AirCheckComponent implements OnInit {

  form: FormGroup;

  calc: number = 0;
  value: number = 0;

  constructor(
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      cWater: ['', [Validators.required]],
      iPressure: ['', [Validators.required]],
      ePressure: ['', [Validators.required]],
      cValue: ['', [Validators.required]],

    });
  }

  onChange(ev) {
    console.log(ev);
  }

  calculator() {
    let cWater = this.form.controls['cWater'].value;
    let iPressure = this.form.controls['iPressure'].value;
    let ePressure = this.form.controls['ePressure'].value;
    let cValue = this.form.controls['cValue'].value;

    console.log(this.form.value);
    // 공통된갑값 -  
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
