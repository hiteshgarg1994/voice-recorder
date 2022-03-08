import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { publicComponent } from './layouts/public/public-component';
import { PUBLIC_ROUTES } from './layouts/public/public-routes';
import { secureComponent } from './layouts/secure/secure-component';
import { NotFoundComponent } from './layouts/notFound.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {VoiceRecorderComponent} from "./widgets/voice-recorder/voice-recorder.component";
import {QrCodeComponent} from "./widgets/qr-code/qr-code.component";
import {AnalysisComponent} from "./analysis/analysis.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: publicComponent, children: PUBLIC_ROUTES },
  {
    path: '',
    component: secureComponent,
    children: [
      { path: 'analysis', component: AnalysisComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'voice-recorder', component: VoiceRecorderComponent },
      { path: 'qr-code', component: QrCodeComponent }
    ]
  },
  { path: '**', component: NotFoundComponent } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
