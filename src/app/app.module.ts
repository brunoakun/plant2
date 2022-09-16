import { FormularioModule } from './formulario/formulario.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormularioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
