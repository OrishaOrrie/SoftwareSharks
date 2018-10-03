import { NgModule } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParticlesModule } from 'angular-particle';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ParticleBackgroundComponent } from './particle-background/particle-background.component';
import { DashHeaderComponent } from './dash/dash-header/dash-header.component';
import { DashSideNavComponent } from './dash/dash-side-nav/dash-side-nav.component';
import { DashOverviewComponent } from './dash/dash-overview/dash-overview.component';
import { AlertComponent } from './alert/alert.component';
import { DashModelsComponent } from './dash/dash-models/dash-models.component';
import { LogoComponent } from './logo/logo.component';
import { FlamesComponent } from './flames/flames.component';
import { DashModelsEditComponent } from './dash/dash-models-edit/dash-models-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ParticlesModule,
    NgbTooltipModule,
    RouterModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    ParticleBackgroundComponent,
    AlertComponent,
    DashHeaderComponent,
    DashSideNavComponent,
    DashOverviewComponent,
    DashModelsComponent,
    LogoComponent,
    FlamesComponent,
    DashModelsEditComponent
  ],
  exports: [
    LayoutComponent,
    ParticleBackgroundComponent,
    AlertComponent,
    LogoComponent,
    FlamesComponent,
    DashHeaderComponent,
    DashSideNavComponent,
    DashOverviewComponent,
    DashModelsComponent
  ]
})
export class UiModule { }
