import { AppComponent } from './app.component';
import { FormComponent } from './formulario/form/form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const rutas: Routes = [  
  { path: '', component: AppComponent }  // Home
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }