import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../views/home/home.component';
import { LoginComponent } from '../../views/login/login.component';
import { DashComponent } from '../../views/dash/dash.component';
import { AuthGuard } from '../../core/auth.guard';
import { UserProfileComponent } from '../../views/user-profile/user-profile.component';
import { DashOverviewComponent } from '..//../ui/dash/dash-overview/dash-overview.component';
import { PageNotFoundComponent } from '../../views/page-not-found/page-not-found.component';
import { DashModelsComponent } from '../../ui/dash/dash-models/dash-models.component';
import { DashModelsCreateComponent } from '../../ui/dash/dash-models-create/dash-models-create.component';
import { DashTrainComponent } from '../../ui/dash/dash-train/dash-train.component';

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
        path: 'models',
        component: DashModelsComponent,
        outlet: 'sidebar'
      },
      {
        path: 'models-create',
        component: DashModelsCreateComponent,
        outlet: 'sidebar'
      },
      {
        path: 'train',
        component: DashTrainComponent,
        outlet: 'sidebar'
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        outlet: 'sidebar'
      },
      {
        path: '',
        redirectTo: '/dashboard/(sidebar:overview)',
        pathMatch: 'full'
      }
    ]
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
