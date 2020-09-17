import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmigoComponent } from './amigo.component';

const routes: Routes = [{ path: '', component: AmigoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmigoRoutingModule { }
