import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CutPageComponent } from './document/pages/cut-page/cut-page.component'
import { DocumentPageComponent } from './document/pages/document-page/document-page.component'

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: DocumentPageComponent },
  { path: 'decoupage', component: CutPageComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PublicRoutingModule { }
