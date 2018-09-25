import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesModule } from 'angular-particle';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ParticleBackgroundComponent } from './particle-background/particle-background.component';

@NgModule({
  imports: [
    CommonModule,
    ParticlesModule
  ],
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    FooterComponent, 
    SideNavComponent, 
    ParticleBackgroundComponent],
  exports: [
    LayoutComponent,
    ParticleBackgroundComponent
  ]
})
export class UiModule { }
