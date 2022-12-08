import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShelvesPage } from './shelves.page';

const routes: Routes = [
  {
    path: '',
    component: ShelvesPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShelvesPageRoutingModule {}
