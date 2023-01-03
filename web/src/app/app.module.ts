import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './routing/app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedModule } from './shared/shared.module'
import { CoreModule } from './core/core.module'
import { MaterialModule } from './material/material.module'
import { PublicModule } from './public/public.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    PublicModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
