import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ComfirmDialogComponent } from './components/comfirm-dialog/comfirm-dialog.component'
import { MaterialModule } from '../material/material.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ComfirmDialogService } from './services/comfirm-dialog/comfirm-dialog.service'
import { OverlayService } from './services/overlay/overlay.service'
import { ProgessSpinnerComponent } from './components/progess-spinner/progess-spinner.component'
import { ValidateurFormulaireService } from './services/validateur-formulaire/validateur-formulaire.service'
import { ValidateurFormulaireInterceptorService } from './interceptors/validateur-formulaire-interceptor.service'
import { HeaderComponent } from './components/navigation/header/header.component'
import { LayoutComponent } from './components/layout/layout.component'
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component'

@NgModule({
  declarations: [
    ComfirmDialogComponent,
    ProgessSpinnerComponent,
    HeaderComponent,
    LayoutComponent,
    SidenavListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    ComfirmDialogService,
    OverlayService,
    ValidateurFormulaireService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ValidateurFormulaireInterceptorService,
      multi: true
    }
  ],
  exports: [
    HttpClientModule,
    ProgessSpinnerComponent,
    HeaderComponent,
    LayoutComponent,
    SidenavListComponent
  ]
})
export class CoreModule { }
