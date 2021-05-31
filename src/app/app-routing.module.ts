import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Page001Component } from './page-001/page-001.component';
import { Page002Component } from './page-002/page-002.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'page-001', component: Page001Component },
      { path: '', redirectTo: 'page-001', pathMatch: 'full' },
      { path: 'page-002', component: Page002Component },
      { path: '**', redirectTo: 'page-001', pathMatch: 'full' }
    ])
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
