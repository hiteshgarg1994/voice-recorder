import {Routes} from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  // {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  // {path: 'login/:responseCode', component: LoginComponent, canActivate: [AuthGuard]},
  // {path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard]},
  // {path: 'forgotPassword', component: ForgotPasswordComponent},
  // {path: 'resetPassword', component: ResetPasswordComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
