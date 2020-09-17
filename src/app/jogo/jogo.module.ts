import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { JogoRoutingModule } from './jogo-routing.module';
import { JogoComponent } from './jogo.component';


@NgModule({
  declarations: [JogoComponent],
  imports: [
    CommonModule,
    JogoRoutingModule,
    MatTableModule
  ]
})
export class JogoModule { }
