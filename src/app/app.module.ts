import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VoiceRecorderComponent } from './widgets/voice-recorder/voice-recorder.component';
import { QrCodeComponent } from './widgets/qr-code/qr-code.component';
import {NotFoundComponent} from "./layouts/notFound.component";

@NgModule({
  declarations: [
    AppComponent,
    InfoDialogComponent,
    DashboardComponent,
    VoiceRecorderComponent,
    QrCodeComponent,
    NotFoundComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule
    ],
  providers: [],
  entryComponents: [InfoDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
