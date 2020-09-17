import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmigoRoutingModule } from './amigo-routing.module';
import { AmigoComponent } from './amigo.component';


@NgModule({
  declarations: [AmigoComponent],
  imports: [
    CommonModule,
    AmigoRoutingModule
  ]
})
export class AmigoModule { }
