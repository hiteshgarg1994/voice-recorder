import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InfoDialogComponent} from './info-dialog/info-dialog.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {VoiceRecorderComponent} from './widgets/voice-recorder/voice-recorder.component';
import {QrCodeComponent} from './widgets/qr-code/qr-code.component';
import {NotFoundComponent} from "./layouts/notFound.component";
import {publicComponent} from "./layouts/public/public-component";
import {secureComponent} from "./layouts/secure/secure-component";
import { NgxSpinnerModule } from "ngx-spinner";
import { ViewVoiceComponent } from './widgets/voice-recorder/view-voice/view-voice.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AnalysisComponent } from './analysis/analysis.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { LoginComponent } from './layouts/public/login/login.component';
import { ForgotPasswordComponent } from './layouts/public/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './layouts/public/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    InfoDialogComponent,
    DashboardComponent,
    VoiceRecorderComponent,
    QrCodeComponent,
    NotFoundComponent,
    publicComponent,
    secureComponent,
    ViewVoiceComponent,
    AnalysisComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBottomSheetModule
  ],
  providers: [],
  entryComponents: [InfoDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
