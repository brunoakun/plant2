import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { InfoComponent } from './info/info.component';
import { FormComponent } from './form/form.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    InfoComponent,
    FormComponent,
    FooterComponent
  ], exports: [
    NavbarComponent,
    HeaderComponent,
    InfoComponent,
    FormComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormularioModule { }
