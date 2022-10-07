import { IUsuario } from 'src/app/_modelos/iusuario';
import { environment } from 'src/environments/environment';
import { DatosService } from '../_servicios/datos.service';

import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import Validation from 'src/app/providers/CustomValidators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  enviado: boolean = false;
  loading: boolean = false;
  errorApi: string = '';
  successApi: string = '';

  public trabajador: IUsuario = {
    nombre: ' ',
    apellidos: ' ',
    telefono: ' ',
    email: ' '
  };

  private idMD5: string = '';
  public listaPob: Array<string> = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    //private modal: NgbModal,
    public srvDatos: DatosService,
    private rutaActiva: ActivatedRoute
  ) { }


  registerForm = this.formBuilder.group({
    direccion: ['', Validators.required],
    cp1: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    cp2: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    poblacion: ['', Validators.required],
    provincia: ['', Validators.required]
  },
    {
      validators: [Validation.match('cp1', 'cp2')]
    }
  );




  ngOnInit() {
    this.rutaActiva.queryParams
      .subscribe(params => {
        console.log(params); // Todos los parámetros
        this.idMD5 = params['idMD5'];
        if (this.idMD5) {
          this.loading = true;
          this.srvDatos.getDatosUsr(this.idMD5).subscribe((respuesta) => {
            if (!respuesta || respuesta.estado == 'error') {
              this.srvDatos.errorMsg = respuesta.mensaje;
              this.loading = false;
              return;
            }
            // Datos trabajador
            console.log('respuesta=' + JSON.stringify(respuesta));
            this.setDatosTrabajador(respuesta.lista[0]);
            
            this.loading = false;
          });
          console.log('trabajador=' + JSON.stringify(this.trabajador));
        }
      }
      );

  }

  setDatosTrabajador(trab: IUsuario) {
    this.trabajador = trab;
    console.log('id=' + trab.id);
    this.registerForm.patchValue({ direccion: trab.direccion });
    this.registerForm.patchValue({ cp1: trab.cp });
    this.registerForm.patchValue({ poblacion: trab.poblacion });
    this.registerForm.patchValue({ provincia: trab.provincia });
  }

  get f() {
    return this.registerForm.controls;
  }


  onSubmit() {
    console.log(this.registerForm.value);
    this.enviado = true;
    if (this.registerForm.invalid) {
      console.log("ERRORES:");
      console.log(this.registerForm.errors);
      return;
    }
  }


  //  BUSCAR CP //
  buscaPob() {
    var cp = this.registerForm.value.cp1;
    this.registerForm.patchValue({ poblacion: '' });
    this.registerForm.patchValue({ provincia: '' });
    this.listaPob = [];

    if (cp.length < 5) return;
    this.loading = true;

    this.srvDatos.getPoblaciones(cp).subscribe((respuesta) => {
      if (!respuesta || respuesta.estado == 'error') {
        this.registerForm.controls['cp1'].setErrors({ 'noExiste': true });
        this.loading = false;
        return;
      }

      // Lista de Poblaciones
      /*
      for (let elemento of respuesta.lista) {
        if (!this.listaPob.includes(elemento.Poblacion)) this.listaPob.push(elemento.Poblacion);
      }
      this.registerForm.patchValue({ dirPob: this.listaPob[0] });
      */

      // Provincia
      this.registerForm.patchValue({ provincia: respuesta.provincia });

      this.loading = false;
    });
  }




}
