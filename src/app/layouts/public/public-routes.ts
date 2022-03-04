import {Routes} from '@angular/router';
import {ViewVoiceComponent} from "../../widgets/voice-recorder/view-voice/view-voice.component";

export const PUBLIC_ROUTES: Routes = [
  // {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  // {path: 'login/:responseCode', component: LoginComponent, canActivate: [AuthGuard]},
  // {path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard]},
  // {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'view-voice/:fileName', component: ViewVoiceComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
