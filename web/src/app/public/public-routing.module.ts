import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DocumentPageComponent } from './document/pages/document-page/document-page.component'

const routes: Routes = [
  { path: '', component: DocumentPageComponent, children: [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'accueil', component: DocumentPageComponent }
  ] }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PublicRoutingModule { }
