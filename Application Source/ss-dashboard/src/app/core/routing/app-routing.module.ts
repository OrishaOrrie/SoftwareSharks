import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../views/home/home.component';
import { LoginComponent } from '../../views/login/login.component';
import { DashComponent } from '../../views/dash/dash.component';
import { AuthGuard } from '../../core/auth.guard';
import { UserProfileComponent } from '../../views/user-profile/user-profile.component';
import { DashOverviewComponent } from '../../ui/dash-overview/dash-overview.component';
import { PageNotFoundComponent } from '../../views/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'overview',
        component: DashOverviewComponent,
        outlet: 'sidebar'
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        outlet: 'sidebar'
      },
      {
        path: '',
        component: DashComponent
      }]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
