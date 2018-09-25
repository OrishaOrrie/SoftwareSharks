import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParticlesModule } from 'angular-particle';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ParticleBackgroundComponent } from './particle-background/particle-background.component';
import { DashHeaderComponent } from './dash-header/dash-header.component';

@NgModule({
  imports: [
    CommonModule,
    ParticlesModule,
    RouterModule
  ],
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    FooterComponent, 
    SideNavComponent, 
    ParticleBackgroundComponent, 
    DashHeaderComponent
  ],
  exports: [
    LayoutComponent,
    ParticleBackgroundComponent,
    DashHeaderComponent
  ]
})
export class UiModule { }
