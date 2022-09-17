import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { InfoComponent } from './info/info.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    FormComponent,
    InfoComponent,
    FooterComponent
  ], exports: [
    NavbarComponent,
    HeaderComponent,
    FormComponent,
    InfoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormularioModule { }
