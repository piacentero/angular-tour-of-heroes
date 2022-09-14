import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroDetailRoutingModule } from './hero-detail-routing.module';
import { HeroDetailComponent } from './hero-detail.component';


@NgModule({
  declarations: [
    HeroDetailComponent
  ],
  imports: [
    CommonModule,
    HeroDetailRoutingModule
  ]
})
export class HeroDetailModule { }
