import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JogoComponent } from './jogo.component';

const routes: Routes = [{ path: '', component: JogoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JogoRoutingModule { }
