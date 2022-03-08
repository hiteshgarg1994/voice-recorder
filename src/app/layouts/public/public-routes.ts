import {Routes} from '@angular/router';
import {ViewVoiceComponent} from "../../widgets/voice-recorder/view-voice/view-voice.component";
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

export const PUBLIC_ROUTES: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'view-voice/:fileName', component: ViewVoiceComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
