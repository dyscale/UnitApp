import { environment } from 'src/environments/environment.prod';
import { ModalController, Platform, AlertController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { PostApiService } from 'src/app/providers/services/post-api.service';
import { FormulaService } from 'src/app/providers/services/formula.service';
import { GetApiService } from 'src/app/providers/services/get-api.service';
import { Storage } from '@ionic/storage';
import { SupportService } from 'src/app/providers/services/support.service';
import { BluetoothService } from 'src/app/providers/providers';
import EscPosEncoder from 'esc-pos-encoder-ionic';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  DEVICEID = environment.device_id;
  printerUUID: string;

  isConnected = false;

  values = {
    common_mass: 0,
    common_water: 0,
    common_volume: 0,
    input_slump: 0,
    input_temp: 0,
    input_before: 0,
    input_after: 0,
    input_i_pressure: 0,
    input_e_pressure: 0,
    mix_volume: 0,
    mass : '',
    air : '',
    quantity : '',
  };
  mixs = {};
  inputs = {};
  mixId: string = '';

  constructor(
    public modalCtrl: ModalController,
    private platform: Platform, 
    private file: File, 
    private ft: FileTransfer, 
    private fileOpener: FileOpener, 
    private document: DocumentViewer,
    public postapi: PostApiService,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public formula: FormulaService,
    public getapi: GetApiService,
    private storage: Storage,
    public support:SupportService,
    private bluetooth: BluetoothService
  ) {
    this.storage.get(this.DEVICEID).then(device => {
      this.getapi.getCommon(device).subscribe((res) => {
        this.values.common_mass = res[0].mass;
        this.values.common_water = res[0].water;
        this.values.common_volume = res[0].volume;
      });
    });

   }

  ngOnInit() {
    const mixs = this.navParams.get('mixs'); // this.navParams.data.excludedTracks;
    const inputs = this.navParams.get('inputs'); // this.navParams.data.excludedTracks;
    
    this.mixId = mixs[0].id;

    this.values.mix_volume = mixs[0].volume;
    this.values.input_slump = inputs.slump;
    this.values.input_temp = inputs.temp;
    this.values.input_before = inputs.concrete;
    this.values.input_after = inputs.water;
    this.values.input_i_pressure = inputs.iPressure;
    this.values.input_e_pressure = inputs.ePressure;

    this.values.mass = this.formula.volumeMass(inputs);
    this.values.air = this.formula.airVolume(mixs[0], inputs);
    this.values.quantity = this.formula.unitQuantity(mixs[0], inputs);
    
    
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss();
  }

  openLocalPdf() {
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    
    this.document.viewDocument('assets/tools.pdf', 'application/pdf', options)
    /*
    let filePath = this.file.applicationDirectory + 'www/assets';
 
    if (this.platform.is('android')) {
      let fakeName = Date.now();
      console.log(filePath);
      this.file.copyFile(filePath, 'tools.pdf', this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
        this.fileOpener.open(result.nativeURL, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
      })
    } else {
      // Use Document viewer for iOS for a better UI
      const options: DocumentViewerOptions = {
        title: 'My PDF'
      }
      this.document.viewDocument(`${filePath}/tools.pdf`, 'application/pdf', options);
    }
    */

  }

  save() {
    this.postapi.measureResult(this.mixId, this.values).subscribe((res) => {
      this.support.presentToast('저장되었습니다.');
    });
    
  }

  alertPrint() {
    let alert = this.alertCtrl.create({
      message: '해당 결과를 출력 하시겠습니까?',
      header: '알림',
      buttons: [
        {
          text: '취소',
          role: 'cancel'
        },
        {
          text: '확인',
          handler: () => {
            this.checkConnection(this.printerUUID);
          }
        }
      ]
    });
    alert.then(alert => alert.present());
  }

  checkConnection(seleccion) {
    this.disconnect().then(() => {
      this.bluetooth.deviceConnection(seleccion).then(success => {                  
        this.isConnected = true;
        this.printer();

      }, fail => {
        this.isConnected = false;
      });
    });
  }


  disconnect(): Promise<boolean> {
    return new Promise(result => {
      this.isConnected = false;
      this.bluetooth.disconnect().then(response => {
        result(response);
      });
    });
  }

  printer() {
    
    let message = ``;
    const encoder = new EscPosEncoder();

    this.bluetooth.dataInOut(`${message}\n`).subscribe(data => {
      if (data !== 'BLUETOOTH.NOT_CONNECTED') {
        try {
          if (data) {
            const entry = JSON.parse(data);
            console.log(entry);
          }
        } catch (error) {
          console.log(`[bluetooth-168]: ${JSON.stringify(error)}`);
        }
        console.log(data);
      } else {
        this.support.presentToast(data);
      }
    });

  }
  
}
