import { NgModule } from '@angular/core';

import { JogoRoutingModule } from './jogo-routing.module';
import { JogoComponent } from './jogo.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [JogoComponent],
  imports: [
    JogoRoutingModule,
    SharedModule
  ]
})
export class JogoModule { }
