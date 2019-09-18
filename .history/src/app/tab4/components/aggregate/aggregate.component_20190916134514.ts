import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.scss']
})
export class AggregateComponent implements OnInit {

  budget: string;
  
  constructor(
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {

  }

  onEvent(ev) {
    let name = ev.target.name;
    switch (name) {
      case "aggregate1":
        day = "Sunday";
        break;
      case "aggregate2":
        day = "Monday";
        break;
      case "iPressure":
         day = "Tuesday";
        break;
      case "ePressure":
        day = "Wednesday";
        break;
    }
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }

}