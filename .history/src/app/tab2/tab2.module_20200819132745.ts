import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab2Page } from './tab2.page';
import { TranslateModule } from '@ngx-translate/core';
import { Tab2PageRoutingModule } from './tab2.router.module';
import { MixListComponent, ResultComponent, MeasureComponent, EditMixComponent } from './components';
import { SharedEditMixModule } from '../providers/shared/shared-edit-mix.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedEditMixModule,
    TranslateModule.forChild(),
    Tab2PageRoutingModule
  ],
  declarations: [
    Tab2Page,
    MixListComponent,
    ResultComponent,
  ],
  entryComponents: [
    EditMixComponent,
    MeasureComponent
  ]
})
export class Tab2PageModule {}
