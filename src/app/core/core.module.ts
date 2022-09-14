import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { InMemoryDataService } from '@shared/services/in-memory-data.service';

@NgModule({
  declarations: [
    MainContainerComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  exports: [
    MainContainerComponent
  ]
})
export class CoreModule { }
