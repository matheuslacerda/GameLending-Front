import { NgModule } from '@angular/core';

import { AmigoRoutingModule } from './amigo-routing.module';
import { AmigoComponent } from './amigo.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AmigoComponent],
  imports: [
    AmigoRoutingModule,
    SharedModule
  ]
})
export class AmigoModule { }
